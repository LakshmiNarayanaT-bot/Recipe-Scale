/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SavedRecipePayload {
  dishName: string;
  originalServings: string;
  presentPeople: string;
  scaleFactor: number;
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
    scaledQuantity: number;
  }[];
  savedAt: string;
  appVersion: string;
}

export interface DriveRecipeFile {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink?: string;
  dishName?: string;
}

/**
 * Saves or updates a recipe file on Google Drive as JSON.
 */
export async function saveRecipeToDrive(
  recipeData: SavedRecipePayload,
  accessToken: string
): Promise<{ id: string; name: string }> {
  const safeDishName = recipeData.dishName.replace(/[^a-zA-Z0-9_\u0900-\u0D7F]/g, '_').slice(0, 40) || 'Recipe';
  const fileName = `RecipeScale_${safeDishName}_${recipeData.presentPeople}p.json`;

  const metadata = {
    name: fileName,
    mimeType: 'application/json',
    description: `Recipe Scale Card: ${recipeData.dishName} scaled for ${recipeData.presentPeople} people`,
  };

  const boundary = '-------RecipeScaleBoundary314159';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(recipeData, null, 2) +
    closeDelimiter;

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Drive API error (${res.status}): ${errorText}`);
  }

  const result = await res.json();
  return { id: result.id, name: result.name };
}

/**
 * Lists all recipes previously saved by Recipe Scale from user's Google Drive.
 */
export async function listRecipesFromDrive(
  accessToken: string
): Promise<DriveRecipeFile[]> {
  const query = encodeURIComponent("name contains 'RecipeScale_' and trashed = false");
  const fields = encodeURIComponent('files(id, name, createdTime, modifiedTime, webViewLink, description)');

  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=modifiedTime desc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list recipes from Google Drive: ${errorText}`);
  }

  const data = await res.json();
  return (data.files || []).map((file: any) => {
    // Extract clean display title from filename
    // e.g. RecipeScale_Fluffy_Pancakes_6p.json -> Fluffy Pancakes (6 people)
    const cleanName = file.name
      .replace(/^RecipeScale_/, '')
      .replace(/\.json$/, '')
      .replace(/_/g, ' ');

    return {
      id: file.id,
      name: cleanName,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      webViewLink: file.webViewLink,
    };
  });
}

/**
 * Downloads a recipe JSON from Google Drive.
 */
export async function loadRecipeFromDrive(
  fileId: string,
  accessToken: string
): Promise<SavedRecipePayload> {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to load recipe from Google Drive: ${errorText}`);
  }

  return await res.json();
}

/**
 * Deletes a recipe file from Google Drive.
 */
export async function deleteRecipeFromDrive(
  fileId: string,
  accessToken: string
): Promise<void> {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete file from Google Drive: ${errorText}`);
  }
}
