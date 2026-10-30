/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  ChefHat,
  Scale,
  Users,
  Utensils,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  Copy,
  Printer,
  Info,
  AlertTriangle,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  Sun,
  Moon,
  Languages,
  HelpCircle,
  FolderOpen,
  Cloud,
  LogOut,
  X,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

// Google Drive Auth & APIs
import {
  initAuth,
  googleSignIn,
  googleLogout,
} from './auth.ts';
import {
  saveRecipeToDrive,
  listRecipesFromDrive,
  loadRecipeFromDrive,
  deleteRecipeFromDrive,
  DriveRecipeFile,
} from './drive.ts';

// Image assets generated for test recipes
import pancakesImg from './assets/images/recipe_pancakes_1791697484528.jpg';
import bologneseImg from './assets/images/recipe_bolognese_1791697497594.jpg';
import cookiesImg from './assets/images/recipe_cookies_1791697510268.jpg';
import smoothieImg from './assets/images/recipe_smoothie_1791697522643.jpg';

import {
  LanguageCode,
  LANGUAGES,
  TRANSLATIONS,
} from './translations.ts';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface ScaledIngredient {
  id: string;
  name: string;
  originalQuantity: number;
  newQuantity: number;
  unit: string;
  percentChange: number;
}

interface RecipePreset {
  id: string;
  dishName: string;
  cuisine: string;
  category: string;
  image: string;
  originalServings: number;
  presentPeople: number;
  ingredients: { name: string; quantity: string; unit: string }[];
}

const COMMON_UNITS = [
  'grams',
  'kg',
  'cups',
  'tbsp',
  'tsp',
  'litres',
  'ml',
  'pcs',
  'oz',
  'lbs',
  'pinch',
  'slices',
];

const PRESETS: RecipePreset[] = [
  {
    id: 'pancakes',
    dishName: 'Fluffy Golden Pancakes',
    cuisine: 'American Breakfast',
    category: 'Breakfast & Brunch',
    image: pancakesImg,
    originalServings: 4,
    presentPeople: 6,
    ingredients: [
      { name: 'All-Purpose Flour', quantity: '250', unit: 'grams' },
      { name: 'Whole Milk', quantity: '300', unit: 'ml' },
      { name: 'Eggs', quantity: '2', unit: 'pcs' },
    ],
  },
  {
    id: 'bolognese',
    dishName: 'Classic Spaghetti Bolognese',
    cuisine: 'Italian Traditional',
    category: 'Main Course',
    image: bologneseImg,
    originalServings: 4,
    presentPeople: 10,
    ingredients: [
      { name: 'Spaghetti Pasta', quantity: '400', unit: 'grams' },
      { name: 'Minced Beef', quantity: '500', unit: 'grams' },
      { name: 'Tomato Passata', quantity: '2', unit: 'cups' },
    ],
  },
  {
    id: 'cookies',
    dishName: 'Chocolate Chip Cookies',
    cuisine: 'Artisan Bakery',
    category: 'Desserts & Baking',
    image: cookiesImg,
    originalServings: 8,
    presentPeople: 16,
    ingredients: [
      { name: 'All-Purpose Flour', quantity: '2.5', unit: 'cups' },
      { name: 'Unsalted Butter', quantity: '1', unit: 'cups' },
      { name: 'Dark Chocolate Chips', quantity: '200', unit: 'grams' },
    ],
  },
  {
    id: 'smoothie',
    dishName: 'Fresh Berry Smoothie',
    cuisine: 'Healthy Refreshment',
    category: 'Drinks & Smoothies',
    image: smoothieImg,
    originalServings: 2,
    presentPeople: 5,
    ingredients: [
      { name: 'Mixed Wild Berries', quantity: '300', unit: 'grams' },
      { name: 'Greek Yogurt', quantity: '1.5', unit: 'cups' },
      { name: 'Pure Honey', quantity: '2', unit: 'tbsp' },
    ],
  },
];

// Helper to convert decimal numbers to clean culinary fractions
function formatCulinaryAmount(val: number, useFractions: boolean): string {
  if (isNaN(val)) return '0';
  if (!useFractions) {
    return Number(val.toFixed(2)).toString();
  }

  const whole = Math.floor(val);
  const frac = val - whole;

  const fractionMap: [number, string][] = [
    [0.125, '⅛'],
    [0.25, '¼'],
    [0.333, '⅓'],
    [0.375, '⅜'],
    [0.5, '½'],
    [0.625, '⅝'],
    [0.666, '⅔'],
    [0.75, '¾'],
    [0.875, '⅞'],
  ];

  let closestSymbol = '';
  let minDiff = 0.05;

  for (const [target, symbol] of fractionMap) {
    const diff = Math.abs(frac - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestSymbol = symbol;
    }
  }

  if (closestSymbol) {
    return whole > 0 ? `${whole} ${closestSymbol}` : closestSymbol;
  }

  return Number(val.toFixed(2)).toString();
}

export default function App() {
  const baseId = useId();

  // Language & Theme State
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Google Drive Auth State
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  // Google Drive Files Modal & Status State
  const [driveModalOpen, setDriveModalOpen] = useState<boolean>(false);
  const [driveFiles, setDriveFiles] = useState<DriveRecipeFile[]>([]);
  const [isDriveLoading, setIsDriveLoading] = useState<boolean>(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState<boolean>(false);
  const [driveFeedback, setDriveFeedback] = useState<string | null>(null);
  const [deleteTargetFile, setDeleteTargetFile] = useState<DriveRecipeFile | null>(null);

  // Sync theme class to document body / root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Recipe Form State
  const [dishName, setDishName] = useState<string>('Fluffy Golden Pancakes');
  const [currentImage, setCurrentImage] = useState<string | null>(pancakesImg);
  const [originalServings, setOriginalServings] = useState<string>('4');
  const [presentPeople, setPresentPeople] = useState<string>('6');
  const [useFractions, setUseFractions] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Initial 3 Ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'All-Purpose Flour', quantity: '250', unit: 'grams' },
    { id: '2', name: 'Whole Milk', quantity: '300', unit: 'ml' },
    { id: '3', name: 'Eggs', quantity: '2', unit: 'pcs' },
  ]);

  // Scaled results and submitted state
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scaledResults, setScaledResults] = useState<{
    scaleFactor: number;
    ratioText: string;
    items: ScaledIngredient[];
  } | null>(null);

  // Prepped checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Sign in handler
  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        setDriveFeedback(t.driveConnected);
        setTimeout(() => setDriveFeedback(null), 3000);
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      alert(err.message || 'Google Sign-in failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Sign out handler
  const handleGoogleSignOut = async () => {
    try {
      await googleLogout();
      setUser(null);
      setAccessToken(null);
      setDriveFiles([]);
      setDriveModalOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Fetch files from Drive
  const handleOpenDriveModal = async () => {
    let token = accessToken;
    if (!user || !token) {
      try {
        const res = await googleSignIn();
        if (!res) return;
        setUser(res.user);
        setAccessToken(res.accessToken);
        token = res.accessToken;
      } catch (err) {
        return;
      }
    }

    setDriveModalOpen(true);
    setIsDriveLoading(true);
    try {
      const files = await listRecipesFromDrive(token);
      setDriveFiles(files);
    } catch (err: any) {
      console.error('List Drive files error:', err);
      alert(err.message || 'Failed to list recipes from Google Drive.');
    } finally {
      setIsDriveLoading(false);
    }
  };

  // Save current recipe to Google Drive
  const handleSaveToDrive = async () => {
    if (!scaledResults) return;

    let token = accessToken;
    if (!user || !token) {
      try {
        const res = await googleSignIn();
        if (!res) return;
        setUser(res.user);
        setAccessToken(res.accessToken);
        token = res.accessToken;
      } catch (err) {
        return;
      }
    }

    setIsSavingToDrive(true);
    try {
      const payload = {
        dishName: dishName.trim() || 'Recipe',
        originalServings,
        presentPeople,
        scaleFactor: scaledResults.scaleFactor,
        ingredients: scaledResults.items.map((it) => ({
          name: it.name,
          quantity: it.originalQuantity.toString(),
          unit: it.unit,
          scaledQuantity: it.newQuantity,
        })),
        savedAt: new Date().toISOString(),
        appVersion: '1.0.0',
      };

      await saveRecipeToDrive(payload, token);
      setDriveFeedback(t.savedToDriveSuccess);
      setTimeout(() => setDriveFeedback(null), 3500);
    } catch (err: any) {
      console.error('Save to Drive error:', err);
      alert(err.message || 'Failed to save recipe to Google Drive.');
    } finally {
      setIsSavingToDrive(false);
    }
  };

  // Load a recipe from Google Drive
  const handleLoadDriveRecipe = async (fileId: string) => {
    if (!accessToken) return;
    setIsDriveLoading(true);
    try {
      const recipeData = await loadRecipeFromDrive(fileId, accessToken);
      setDishName(recipeData.dishName);
      setCurrentImage(null);
      setOriginalServings(recipeData.originalServings);
      setPresentPeople(recipeData.presentPeople);
      setIngredients(
        recipeData.ingredients.map((ing, idx) => ({
          id: `drive-${idx}-${Date.now()}`,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
        }))
      );

      // Auto scale
      const orig = parseFloat(recipeData.originalServings);
      const present = parseFloat(recipeData.presentPeople);
      const scaleFactor = present / orig;
      const ratioText = `${present} ${t.peopleUnit} / ${orig} ${t.servingsUnit} (${(
        scaleFactor * 100
      ).toFixed(0)}%)`;

      const computedItems: ScaledIngredient[] = recipeData.ingredients.map(
        (ing, idx) => {
          const origQty = parseFloat(ing.quantity) || 0;
          const newQty = (origQty * present) / orig;
          const percentChange = ((newQty - origQty) / (origQty || 1)) * 100;
          return {
            id: `drive-${idx}-${Date.now()}`,
            name: ing.name,
            originalQuantity: origQty,
            newQuantity: newQty,
            unit: ing.unit,
            percentChange,
          };
        }
      );

      setScaledResults({
        scaleFactor,
        ratioText,
        items: computedItems,
      });
      setHasCalculated(true);
      setDriveModalOpen(false);
    } catch (err: any) {
      console.error('Load recipe error:', err);
      alert(err.message || 'Failed to load recipe from Google Drive.');
    } finally {
      setIsDriveLoading(false);
    }
  };

  // Execute Destructive Delete with Mandatory Dialog Confirmation
  const handleConfirmDelete = async () => {
    if (!deleteTargetFile || !accessToken) return;
    setIsDriveLoading(true);
    try {
      await deleteRecipeFromDrive(deleteTargetFile.id, accessToken);
      setDriveFiles((prev) => prev.filter((f) => f.id !== deleteTargetFile.id));
      setDeleteTargetFile(null);
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(err.message || 'Failed to delete file from Google Drive.');
    } finally {
      setIsDriveLoading(false);
    }
  };

  // Add ingredient
  const handleAddIngredient = () => {
    const newId = `${baseId}-${Date.now()}`;
    const nextExample =
      t.ingredientExamples[ingredients.length % t.ingredientExamples.length];
    setIngredients((prev) => [
      ...prev,
      {
        id: newId,
        name: '',
        quantity: '',
        unit: nextExample?.unit || 'cups',
      },
    ]);
  };

  // Remove ingredient
  const handleRemoveIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      alert('You need at least one ingredient to scale.');
      return;
    }
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  // Update ingredient
  const handleUpdateIngredient = (
    id: string,
    field: keyof Omit<Ingredient, 'id'>,
    value: string
  ) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Load Preset
  const handleLoadPreset = (preset: RecipePreset, autoScale: boolean = false) => {
    setDishName(preset.dishName);
    setCurrentImage(preset.image);
    setOriginalServings(preset.originalServings.toString());
    setPresentPeople(preset.presentPeople.toString());
    const mapped = preset.ingredients.map((ing, idx) => ({
      id: `preset-${idx}-${Date.now()}`,
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
    }));
    setIngredients(mapped);
    setCheckedItems({});
    setErrorMessage(null);

    if (autoScale) {
      const orig = preset.originalServings;
      const present = preset.presentPeople;
      const scaleFactor = present / orig;
      const ratioText = `${present} ${t.peopleUnit} / ${orig} ${t.servingsUnit} (${(
        scaleFactor * 100
      ).toFixed(0)}%)`;
      const computedItems: ScaledIngredient[] = preset.ingredients.map((ing, idx) => {
        const origQty = parseFloat(ing.quantity) || 0;
        const newQty = (origQty * present) / orig;
        const percentChange = ((newQty - origQty) / (origQty || 1)) * 100;
        return {
          id: `preset-${idx}-${Date.now()}`,
          name: ing.name,
          originalQuantity: origQty,
          newQuantity: newQty,
          unit: ing.unit,
          percentChange,
        };
      });

      setScaledResults({
        scaleFactor,
        ratioText,
        items: computedItems,
      });
      setHasCalculated(true);
    } else {
      setHasCalculated(false);
      setScaledResults(null);
    }

    const formElem = document.getElementById('recipe-form-anchor');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fill with normal everyday cuisine example
  const handleFillNormalExample = () => {
    setDishName(t.defaultDishExample);
    setCurrentImage(null);
    setOriginalServings('4');
    setPresentPeople('6');
    setIngredients(
      t.ingredientExamples.slice(0, 3).map((ex, idx) => ({
        id: `example-${idx}-${Date.now()}`,
        name: ex.name,
        quantity: ex.amount,
        unit: ex.unit,
      }))
    );
    setHasCalculated(false);
    setScaledResults(null);
    setErrorMessage(null);
    setCheckedItems({});
  };

  // Clear inputs
  const handleClearInputs = () => {
    setDishName('');
    setCurrentImage(null);
    setOriginalServings('');
    setPresentPeople('');
    setIngredients([
      { id: '1', name: '', quantity: '', unit: 'cups' },
      { id: '2', name: '', quantity: '', unit: 'grams' },
      { id: '3', name: '', quantity: '', unit: 'tbsp' },
    ]);
    setHasCalculated(false);
    setScaledResults(null);
    setErrorMessage(null);
    setCheckedItems({});
  };

  // Quick adjust present people
  const handleQuickMultiply = (factor: number) => {
    const orig = parseFloat(originalServings) || 4;
    const calculated = Math.round(orig * factor * 10) / 10;
    setPresentPeople(calculated.toString());
  };

  // Validate and Scale Recipe
  const handleScaleRecipe = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setHasCalculated(true);

    const orig = parseFloat(originalServings.trim());
    const present = parseFloat(presentPeople.trim());

    if (originalServings.trim() === '' || isNaN(orig)) {
      setErrorMessage(t.errorOriginalEmpty);
      setScaledResults(null);
      return;
    }

    if (orig <= 0) {
      setErrorMessage(t.errorOriginalZeroOrNeg);
      setScaledResults(null);
      return;
    }

    if (presentPeople.trim() === '' || isNaN(present)) {
      setErrorMessage(t.errorPresentEmpty);
      setScaledResults(null);
      return;
    }

    if (present <= 0) {
      setErrorMessage(t.errorPresentZeroOrNeg);
      setScaledResults(null);
      return;
    }

    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() !== ''
    );
    if (validIngredients.length === 0) {
      setErrorMessage(t.errorNoIngredients);
      setScaledResults(null);
      return;
    }

    const scaleFactor = present / orig;
    const ratioText = `${present} ${t.peopleUnit} / ${orig} ${t.servingsUnit} (${(
      scaleFactor * 100
    ).toFixed(0)}%)`;

    const computedItems: ScaledIngredient[] = validIngredients.map((ing) => {
      const origQty = parseFloat(ing.quantity) || 0;
      const newQty = (origQty * present) / orig;
      const percentChange = ((newQty - origQty) / (origQty || 1)) * 100;

      return {
        id: ing.id,
        name: ing.name.trim(),
        originalQuantity: origQty,
        newQuantity: newQty,
        unit: ing.unit,
        percentChange,
      };
    });

    setScaledResults({
      scaleFactor,
      ratioText,
      items: computedItems,
    });
  };

  // Copy recipe to clipboard
  const handleCopyRecipe = () => {
    if (!scaledResults) return;

    const lines = [
      `🍳 ${dishName.trim() || t.appTitle}`,
      `👥 ${t.scaleTo}: ${presentPeople} ${t.peopleUnit} (${t.baseServings}: ${originalServings} ${t.servingsUnit})`,
      `📐 ${t.multiplierText}: ${scaledResults.scaleFactor.toFixed(2)}x`,
      `---------------------------------`,
      `${t.ingredientsTitle}:`,
      ...scaledResults.items.map(
        (item) =>
          `• ${item.name}: ${formatCulinaryAmount(
            item.newQuantity,
            useFractions
          )} ${item.unit} (${t.originalText}: ${item.originalQuantity} ${item.unit})`
      ),
      `---------------------------------`,
      `Recipe Scale`,
    ];

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Toggle item check
  const toggleItemCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-gradient-to-b from-violet-100/50 via-violet-50/20 to-white text-slate-800'
      } pb-20 selection:bg-violet-300 selection:text-violet-950`}
    >
      {/* Top Bar with Language, Google Drive Integration & Theme Toggle */}
      <header
        className={`no-print border-b sticky top-0 z-30 shadow-xs transition-colors ${
          isDarkMode
            ? 'bg-slate-950/90 border-violet-900/60 backdrop-blur-md'
            : 'bg-white/95 border-violet-200/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-700 to-purple-600 text-white flex items-center justify-center shadow-md shadow-violet-500/20">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span
                className={`text-lg sm:text-xl font-bold tracking-tight block leading-tight ${
                  isDarkMode ? 'text-violet-100' : 'text-violet-950'
                }`}
              >
                {t.appTitle}
              </span>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isDarkMode ? 'text-violet-400' : 'text-violet-600'
                }`}
              >
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Right Controls: Google Drive, Language, Theme, Scale */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Google Drive Status & Login */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleOpenDriveModal}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-900 hover:bg-slate-800 border-violet-800 text-violet-200'
                      : 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-900'
                  }`}
                  title={t.viewDriveRecipes}
                >
                  <FolderOpen className="w-3.5 h-3.5 text-violet-500" />
                  <span className="hidden sm:inline">{t.viewDriveRecipes}</span>
                </button>

                <div className="relative group">
                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-750 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {user.displayName?.[0] || 'U'}
                      </div>
                    )}
                    <span className="hidden md:inline max-w-[80px] truncate">
                      {user.displayName || 'Google'}
                    </span>
                    <button
                      type="button"
                      onClick={handleGoogleSignOut}
                      className="text-slate-400 hover:text-rose-500 p-0.5 ml-0.5 transition-colors cursor-pointer"
                      title={t.signOut}
                    >
                      <LogOut className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isAuthLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {/* Official Google 'G' icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">{t.signInWithGoogle}</span>
                <span className="sm:hidden">Google</span>
              </button>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  isDarkMode
                    ? 'bg-slate-900 border-violet-800/80 text-violet-200 hover:bg-slate-850'
                    : 'bg-violet-50 border-violet-200 text-violet-900 hover:bg-violet-100'
                }`}
              >
                <Languages className="w-3.5 h-3.5 text-violet-500" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  aria-label="Change Language"
                  className="bg-transparent text-xs font-semibold cursor-pointer outline-none focus:ring-0 pr-1"
                >
                  {LANGUAGES.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
                    >
                      {lang.nativeName} ({lang.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-violet-800/80 text-amber-300 hover:bg-slate-800'
                  : 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Scale CTA Button */}
            <button
              type="button"
              onClick={() => handleScaleRecipe()}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-violet-700 hover:bg-violet-800 active:bg-violet-900 rounded-lg shadow-sm shadow-violet-500/20 transition-all whitespace-nowrap cursor-pointer"
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{t.scaleRecipeBtn}</span>
              <span className="sm:hidden">{t.scaleNow}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Drive Toast Banner */}
      {driveFeedback && (
        <div className="no-print bg-emerald-600 text-white text-xs font-semibold px-4 py-2 text-center transition-all flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle className="w-4 h-4" />
          <span>{driveFeedback}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        {/* Hero Section */}
        <div
          className={`no-print rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border ${
            isDarkMode
              ? 'bg-gradient-to-br from-violet-950 via-slate-950 to-indigo-950 border-violet-800/40 shadow-violet-950/40'
              : 'bg-gradient-to-br from-violet-950 via-violet-900 to-purple-900 border-violet-800/40 shadow-violet-950/15'
          }`}
        >
          <div className="absolute -right-8 -bottom-8 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
            <Utensils className="w-48 h-48 text-white transform rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-800/60 border border-violet-600/50 rounded-lg text-violet-200 text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              <span>{t.smartProportions}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
              {t.heroHeadline}
            </h1>
            <p className="text-sm sm:text-base text-violet-100/90 leading-relaxed mb-4">
              {t.heroDesc}
            </p>

            {/* Google Drive Status Line */}
            <div className="pt-2 border-t border-violet-800/60 flex items-center gap-2 text-xs text-violet-200">
              <Cloud className="w-3.5 h-3.5 text-violet-400" />
              <span>{t.googleDriveNote}</span>
            </div>
          </div>
        </div>

        {/* Test Recipes Section */}
        <div className="no-print space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2
                className={`text-lg font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-violet-100' : 'text-violet-950'
                }`}
              >
                <Flame className="w-5 h-5 text-violet-500" />
                {t.testRecipesTitle}
              </h2>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t.testRecipesSubtitle}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-md border self-start sm:self-auto ${
                isDarkMode
                  ? 'bg-violet-950/80 border-violet-800 text-violet-300'
                  : 'bg-violet-50 border-violet-200 text-violet-700'
              }`}
            >
              {t.instantLoad}
            </span>
          </div>

          {/* Grid of 4 Aesthetic Cuisine Recipe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESETS.map((preset) => {
              const isSelected = dishName === preset.dishName;
              return (
                <div
                  key={preset.id}
                  className={`group rounded-2xl overflow-hidden border transition-all flex flex-col shadow-xs ${
                    isDarkMode
                      ? isSelected
                        ? 'border-violet-500 ring-2 ring-violet-500/40 bg-slate-900 shadow-md shadow-violet-950'
                        : 'border-violet-900/50 bg-slate-900/90 hover:border-violet-700'
                      : isSelected
                      ? 'border-violet-500 ring-2 ring-violet-400/40 bg-white shadow-md shadow-violet-200'
                      : 'border-violet-100 bg-white hover:border-violet-300 hover:shadow-md'
                  }`}
                >
                  {/* Recipe Image with Scrim and Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={preset.image}
                      alt={preset.dishName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Top Cuisine Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-white">
                      <span className="px-2 py-0.5 rounded-md bg-violet-950/80 backdrop-blur-md border border-violet-400/30">
                        {preset.cuisine}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-md bg-violet-600 text-white shadow-sm flex items-center gap-1 font-bold">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay text */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="text-[11px] font-medium text-violet-200 block">
                        {preset.category}
                      </span>
                      <h3 className="text-sm font-bold leading-tight drop-shadow-sm truncate">
                        {preset.dishName}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content & Action */}
                  <div
                    className={`p-3.5 flex flex-col justify-between flex-1 gap-3 ${
                      isDarkMode ? 'bg-slate-900' : 'bg-white'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between text-xs border-b pb-2 ${
                        isDarkMode
                          ? 'border-slate-800 text-slate-300'
                          : 'border-violet-50 text-slate-600'
                      }`}
                    >
                      <span>
                        {t.baseServings}:{' '}
                        <strong className={isDarkMode ? 'text-violet-300' : 'text-violet-950'}>
                          {preset.originalServings}
                        </strong>{' '}
                        {t.servingsUnit}
                      </span>
                      <span className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>|</span>
                      <span>
                        {t.scaleTo}:{' '}
                        <strong className="text-violet-500 font-bold">
                          {preset.presentPeople}
                        </strong>{' '}
                        {t.peopleUnit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadPreset(preset, false)}
                        className={`flex-1 py-1.5 px-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                          isDarkMode
                            ? isSelected
                              ? 'bg-violet-900/60 text-violet-200 border border-violet-700'
                              : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                            : isSelected
                            ? 'bg-violet-100 text-violet-900 border border-violet-300'
                            : 'bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200/70'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                        {t.editInputs}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLoadPreset(preset, true)}
                        className="py-1.5 px-3 text-xs font-semibold rounded-lg bg-violet-700 hover:bg-violet-800 text-white transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                        title="Load and immediately scale"
                      >
                        <span>{t.scaleNow}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input Form Section Anchor */}
        <div id="recipe-form-anchor" className="scroll-mt-20" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScaleRecipe();
          }}
          className="no-print space-y-6"
        >
          {/* Main Parameters: Dish Name, Original Serving, Present People */}
          <div
            className={`rounded-2xl border shadow-sm p-6 sm:p-7 space-y-6 transition-colors ${
              isDarkMode
                ? 'bg-slate-900/90 border-violet-900/60'
                : 'bg-white border-violet-200/90'
            }`}
          >
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
                isDarkMode ? 'border-slate-800' : 'border-violet-100'
              }`}
            >
              <div>
                <h2
                  className={`text-lg font-bold flex items-center gap-2 ${
                    isDarkMode ? 'text-violet-100' : 'text-violet-950'
                  }`}
                >
                  <Utensils className="w-5 h-5 text-violet-500" />
                  {t.recipeParameters}
                </h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {t.recipeParametersSubtitle}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillNormalExample}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-violet-950/60 hover:bg-violet-900/80 border-violet-800 text-violet-200'
                      : 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                  <span>{t.useExampleBtn}</span>
                </button>

                {currentImage && (
                  <div
                    className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border ${
                      isDarkMode
                        ? 'bg-slate-850 border-violet-800/80 text-violet-200'
                        : 'bg-violet-50 border-violet-200 text-violet-900'
                    }`}
                  >
                    <img
                      src={currentImage}
                      alt={dishName}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-lg object-cover shadow-xs border border-violet-300/40"
                    />
                    <span className="text-xs font-semibold truncate max-w-[120px]">
                      {dishName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* 1. Dish Name [Name] */}
              <div className="md:col-span-6 space-y-2">
                <label
                  htmlFor="dishNameInput"
                  className={`block text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                    isDarkMode ? 'text-violet-200' : 'text-violet-950'
                  }`}
                >
                  <span>{t.dishNameLabel}</span>
                  {!dishName && (
                    <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold normal-case">
                      ({t.examplePrefix} {t.defaultDishExample})
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    id="dishNameInput"
                    type="text"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder={`${t.dishNamePlaceholder} (${t.examplePrefix} ${t.defaultDishExample})`}
                    className={`w-full px-4 py-3 border rounded-xl font-medium transition-all text-sm outline-none ${
                      isDarkMode
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20'
                        : 'bg-violet-50/20 hover:bg-violet-50/40 focus:bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-400'}>
                    {t.dishNameDesc}
                  </span>
                  {!dishName && (
                    <span className="text-violet-600 dark:text-violet-400 font-medium">
                      {t.examplePrefix} {t.defaultDishExample}
                    </span>
                  )}
                </div>
              </div>

              {/* 2. Original Serving [Number] */}
              <div className="md:col-span-3 space-y-2">
                <label
                  htmlFor="originalServingsInput"
                  className={`block text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                    isDarkMode ? 'text-violet-200' : 'text-violet-950'
                  }`}
                >
                  <span>{t.originalServingLabel}</span>
                  <span className="text-[10px] text-violet-400 font-semibold lowercase">
                    {t.originalServingSub}
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="originalServingsInput"
                    type="number"
                    min="0.1"
                    step="any"
                    value={originalServings}
                    onChange={(e) => setOriginalServings(e.target.value)}
                    placeholder={`${t.examplePrefix} 4`}
                    className={`w-full px-4 py-3 border rounded-xl font-bold text-sm transition-all outline-none ${
                      hasCalculated &&
                      (!originalServings || parseFloat(originalServings) <= 0)
                        ? 'border-rose-500 bg-rose-500/10 text-rose-300 focus:ring-rose-500/20'
                        : isDarkMode
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20'
                        : 'bg-violet-50/20 hover:bg-violet-50/40 focus:bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                    }`}
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-semibold text-slate-400 pointer-events-none">
                    {t.servingsUnit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-400'}>
                    {t.originalServingDesc}
                  </span>
                  {!originalServings && (
                    <span className="text-violet-600 dark:text-violet-400 font-semibold font-mono">
                      {t.examplePrefix} 4
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Present People [Number] */}
              <div className="md:col-span-3 space-y-2">
                <label
                  htmlFor="presentPeopleInput"
                  className={`block text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                    isDarkMode ? 'text-violet-200' : 'text-violet-950'
                  }`}
                >
                  <span>{t.presentPeopleLabel}</span>
                  <span className="text-[10px] text-violet-400 font-semibold lowercase">
                    {t.presentPeopleSub}
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="presentPeopleInput"
                    type="number"
                    min="0.1"
                    step="any"
                    value={presentPeople}
                    onChange={(e) => setPresentPeople(e.target.value)}
                    placeholder={`${t.examplePrefix} 6`}
                    className={`w-full px-4 py-3 border rounded-xl font-bold text-sm transition-all outline-none ${
                      hasCalculated &&
                      (!presentPeople || parseFloat(presentPeople) <= 0)
                        ? 'border-rose-500 bg-rose-500/10 text-rose-300 focus:ring-rose-500/20'
                        : isDarkMode
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20'
                        : 'bg-violet-50/20 hover:bg-violet-50/40 focus:bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                    }`}
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-semibold text-slate-400 pointer-events-none">
                    {t.peopleUnit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-400'}>
                    {t.presentPeopleDesc}
                  </span>
                  {!presentPeople && (
                    <span className="text-violet-600 dark:text-violet-400 font-semibold font-mono">
                      {t.examplePrefix} 6
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Multiplier Buttons */}
            <div
              className={`pt-2 flex flex-wrap items-center gap-2 border-t ${
                isDarkMode ? 'border-slate-800' : 'border-violet-100'
              }`}
            >
              <span
                className={`text-xs font-semibold flex items-center gap-1 mr-1 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-violet-500" />
                {t.quickMultipliers}:
              </span>
              {[
                { label: '0.5x', factor: 0.5 },
                { label: '1x', factor: 1 },
                { label: '1.5x', factor: 1.5 },
                { label: '2x', factor: 2 },
                { label: '3x', factor: 3 },
                { label: '4x', factor: 4 },
              ].map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickMultiply(btn.factor)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-750 text-violet-200 border-violet-900/60'
                      : 'bg-violet-50 hover:bg-violet-100 text-violet-900 border border-violet-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Ingredients with Box Shape Design */}
          <div
            className={`rounded-2xl border shadow-sm p-6 sm:p-7 space-y-6 transition-colors ${
              isDarkMode
                ? 'bg-slate-900/90 border-violet-900/60'
                : 'bg-white border-violet-200/90'
            }`}
          >
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
                isDarkMode ? 'border-slate-800' : 'border-violet-100'
              }`}
            >
              <div>
                <h2
                  className={`text-lg font-bold flex items-center gap-2 ${
                    isDarkMode ? 'text-violet-100' : 'text-violet-950'
                  }`}
                >
                  <Scale className="w-5 h-5 text-violet-500" />
                  {t.ingredientsTitle} ({ingredients.length})
                </h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {t.ingredientsSubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-750 text-violet-300 border-violet-800'
                      : 'bg-violet-50 hover:bg-violet-100 active:bg-violet-200 text-violet-800 border-violet-200'
                  }`}
                >
                  <Plus className="w-4 h-4 text-violet-500" />
                  {t.addIngredient}
                </button>
              </div>
            </div>

            {/* Modular Ingredient Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients.map((item, index) => {
                const isFirstThree = index < 3;
                const example =
                  t.ingredientExamples[index % t.ingredientExamples.length] || {
                    name: 'Ingredient',
                    amount: '1',
                    unit: 'cups',
                  };

                const isFieldEmpty = !item.name.trim() || !item.quantity.trim();

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                      isDarkMode
                        ? isFirstThree
                          ? 'border-violet-800/80 bg-violet-950/20 shadow-xs'
                          : 'border-slate-800 bg-slate-900'
                        : isFirstThree
                        ? 'border-violet-200 bg-violet-50/30 shadow-xs'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {/* Box Header Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-violet-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                          {index + 1}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            isDarkMode ? 'text-violet-200' : 'text-violet-950'
                          }`}
                        >
                          {isFirstThree
                            ? `${t.primaryIngredient} 0${index + 1}`
                            : `${t.ingredientIndex} 0${index + 1}`}
                        </span>
                      </div>

                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Remove ingredient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Ingredient Name */}
                      <div>
                        <label
                          htmlFor={`ing-name-${item.id}`}
                          className={`block text-[11px] font-semibold uppercase mb-1 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {t.ingredientNameLabel}
                        </label>
                        <input
                          id={`ing-name-${item.id}`}
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleUpdateIngredient(
                              item.id,
                              'name',
                              e.target.value
                            )
                          }
                          placeholder={`${t.examplePrefix} ${example.name}`}
                          className={`w-full px-3 py-2 text-sm border rounded-lg font-medium transition-all outline-none ${
                            isDarkMode
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20'
                              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200'
                          }`}
                        />
                      </div>

                      {/* Quantity & Unit in side-by-side box shape */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label
                            htmlFor={`ing-qty-${item.id}`}
                            className={`block text-[11px] font-semibold uppercase mb-1 ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {t.origQuantityLabel}
                          </label>
                          <input
                            id={`ing-qty-${item.id}`}
                            type="number"
                            step="any"
                            min="0"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateIngredient(
                                item.id,
                                'quantity',
                                e.target.value
                              )
                            }
                            placeholder={`${t.examplePrefix} ${example.amount}`}
                            className={`w-full px-3 py-2 text-sm border rounded-lg font-bold font-mono outline-none ${
                              isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20'
                                : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200'
                            }`}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`ing-unit-${item.id}`}
                            className={`block text-[11px] font-semibold uppercase mb-1 ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {t.unitsLabel}
                          </label>
                          <select
                            id={`ing-unit-${item.id}`}
                            value={item.unit}
                            onChange={(e) =>
                              handleUpdateIngredient(
                                item.id,
                                'unit',
                                e.target.value
                              )
                            }
                            className={`w-full px-2.5 py-2 text-sm border rounded-lg font-medium capitalize outline-none ${
                              isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20'
                                : 'bg-white border-slate-200 text-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-200'
                            }`}
                          >
                            {COMMON_UNITS.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Example Callout when input is empty */}
                      {isFieldEmpty && (
                        <div
                          className={`text-[11px] rounded-lg p-2 border flex items-center justify-between gap-1 ${
                            isDarkMode
                              ? 'bg-violet-950/40 border-violet-900/60 text-violet-300'
                              : 'bg-violet-50/70 border-violet-200/70 text-violet-800'
                          }`}
                        >
                          <div className="flex items-center gap-1 truncate">
                            <HelpCircle className="w-3 h-3 text-violet-500 shrink-0" />
                            <span className="truncate">
                              {t.examplePrefix} <strong>{example.name}</strong>
                            </span>
                          </div>
                          <span className="font-mono font-semibold shrink-0">
                            {t.amountWord} {example.amount} {example.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Bar */}
            <div
              className={`pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${
                isDarkMode ? 'border-slate-800' : 'border-violet-100'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <Info className="w-4 h-4 text-violet-500 shrink-0" />
                <span>{t.formulaNote}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleClearInputs}
                  className={`w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {t.clearAll}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-2.5 text-sm font-bold text-white bg-violet-700 hover:bg-violet-800 active:bg-violet-900 rounded-xl shadow-md shadow-violet-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  {t.scaleRecipeBtn}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Validation Error Banner (When Servings are empty, zero, or negative) */}
        {errorMessage && (
          <div
            role="alert"
            className="no-print bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl p-5 shadow-sm flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-rose-200">
                {t.cannotScale}
              </h3>
              <p className="text-xs sm:text-sm text-rose-300 leading-relaxed">
                {errorMessage}
              </p>
              <p className="text-[11px] text-rose-400">
                {t.positiveValuesHint}
              </p>
            </div>
          </div>
        )}

        {/* Informative Guidance if not calculated yet and no error */}
        {!hasCalculated && !scaledResults && !errorMessage && (
          <div
            className={`no-print rounded-2xl p-6 text-center space-y-2 border transition-colors ${
              isDarkMode
                ? 'bg-slate-900/60 border-violet-900/40 text-slate-300'
                : 'bg-violet-50/60 border-violet-200/80 text-slate-600'
            }`}
          >
            <ChefHat className="w-8 h-8 text-violet-500 mx-auto" />
            <h3
              className={`text-sm font-bold ${
                isDarkMode ? 'text-violet-200' : 'text-violet-950'
              }`}
            >
              {t.readyTitle}
            </h3>
            <p className="text-xs max-w-md mx-auto">{t.readyDesc}</p>
          </div>
        )}

        {/* OUTPUT SECTION: Renders ONLY when calculated with valid inputs */}
        {scaledResults && (
          <section className="print-sheet space-y-6">
            <div
              className={`rounded-2xl border shadow-lg p-6 sm:p-8 space-y-6 transition-colors ${
                isDarkMode
                  ? 'bg-slate-900 border-violet-800/60 text-white shadow-violet-950/20'
                  : 'bg-white border-violet-300/80 text-slate-800 shadow-violet-950/5'
              }`}
            >
              {/* Output Header with Recipe Image & Meta */}
              <div
                className={`flex flex-col md:flex-row md:items-center justify-between gap-5 border-b pb-6 ${
                  isDarkMode ? 'border-slate-800' : 'border-violet-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {currentImage && (
                    <img
                      src={currentImage}
                      alt={dishName}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-violet-500/40 shadow-sm shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 text-[11px] font-bold text-white bg-violet-700 rounded-md">
                        {t.scaledResultsBadge}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                          isDarkMode
                            ? 'bg-violet-950 border-violet-800 text-violet-300'
                            : 'bg-violet-50 border-violet-200 text-violet-700'
                        }`}
                      >
                        {scaledResults.scaleFactor.toFixed(2)}x {t.multiplierText}
                      </span>
                    </div>
                    <h2
                      className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                        isDarkMode ? 'text-violet-100' : 'text-violet-950'
                      }`}
                    >
                      {dishName.trim() || t.appTitle}
                    </h2>
                    <p
                      className={`text-xs sm:text-sm mt-1 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {t.adjustedSentence
                        .replace('{orig}', originalServings)
                        .replace('{present}', presentPeople)}
                    </p>
                  </div>
                </div>

                {/* Output Controls (Drive Save, Copy, Print, Fraction Toggle) */}
                <div className="no-print flex flex-wrap items-center gap-2 self-start md:self-auto">
                  {/* Save to Google Drive Button */}
                  <button
                    type="button"
                    onClick={handleSaveToDrive}
                    disabled={isSavingToDrive}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>
                      {isSavingToDrive ? t.savingToDrive : t.saveToDrive}
                    </span>
                  </button>

                  {/* Fractions vs Decimals Toggle */}
                  <button
                    type="button"
                    onClick={() => setUseFractions(!useFractions)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-750 text-violet-200 border-violet-800'
                        : 'bg-violet-50 hover:bg-violet-100 text-violet-800 border-violet-200'
                    }`}
                    title="Toggle format"
                  >
                    {useFractions ? t.formatFractions : t.formatDecimals}
                  </button>

                  {/* Copy Recipe */}
                  <button
                    type="button"
                    onClick={handleCopyRecipe}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyRecipe}</span>
                      </>
                    )}
                  </button>

                  {/* Print Card */}
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-700 hover:bg-violet-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.printSheet}</span>
                  </button>
                </div>
              </div>

              {/* Scaling Metric Cards Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={`border rounded-xl p-4 transition-colors ${
                    isDarkMode
                      ? 'bg-slate-850 border-violet-900/60'
                      : 'bg-violet-50/70 border-violet-200/80'
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      isDarkMode ? 'text-violet-300' : 'text-violet-950'
                    }`}
                  >
                    {t.baselineCard}
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span
                      className={`text-2xl font-extrabold font-mono ${
                        isDarkMode ? 'text-violet-100' : 'text-violet-950'
                      }`}
                    >
                      {originalServings}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isDarkMode ? 'text-violet-400' : 'text-violet-700'
                      }`}
                    >
                      {t.servingsUnit}
                    </span>
                  </div>
                </div>

                <div
                  className={`border rounded-xl p-4 transition-colors ${
                    isDarkMode
                      ? 'bg-slate-850 border-violet-900/60'
                      : 'bg-violet-50/70 border-violet-200/80'
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      isDarkMode ? 'text-violet-300' : 'text-violet-950'
                    }`}
                  >
                    {t.targetCard}
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span
                      className={`text-2xl font-extrabold font-mono ${
                        isDarkMode ? 'text-violet-100' : 'text-violet-950'
                      }`}
                    >
                      {presentPeople}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isDarkMode ? 'text-violet-400' : 'text-violet-700'
                      }`}
                    >
                      {t.peopleUnit}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-700 to-purple-800 rounded-xl p-4 text-white shadow-sm">
                  <span className="text-xs font-bold text-violet-200 uppercase tracking-wider block">
                    {t.scaleFactorCard}
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold font-mono">
                      {scaledResults.scaleFactor.toFixed(2)}x
                    </span>
                    <span className="text-xs text-violet-200 font-medium">
                      {scaledResults.scaleFactor >= 1 ? t.scaledUp : t.scaledDown}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scaled Ingredients List & Kitchen Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-base font-bold flex items-center gap-2 ${
                      isDarkMode ? 'text-violet-100' : 'text-violet-950'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-500" />
                    {t.checklistTitle}
                  </h3>
                  <span
                    className={`text-xs hidden sm:block ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {t.checklistSubtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {scaledResults.items.map((item, idx) => {
                    const isChecked = checkedItems[item.id] || false;
                    const formattedNewQty = formatCulinaryAmount(
                      item.newQuantity,
                      useFractions
                    );
                    const formattedOrigQty = formatCulinaryAmount(
                      item.originalQuantity,
                      useFractions
                    );

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItemCheck(item.id)}
                        className={`cursor-pointer border rounded-xl p-4 transition-all select-none flex flex-col justify-between ${
                          isChecked
                            ? isDarkMode
                              ? 'bg-slate-950/60 border-slate-800 opacity-50'
                              : 'bg-slate-50/70 border-slate-200 opacity-60'
                            : isDarkMode
                            ? 'bg-slate-850 hover:bg-slate-800 border-violet-900/60 hover:border-violet-600 shadow-xs'
                            : 'bg-white hover:bg-violet-50/40 border-violet-200 hover:border-violet-400 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                                isChecked
                                  ? 'bg-emerald-600 text-white'
                                  : isDarkMode
                                  ? 'border border-slate-600 bg-slate-800 text-transparent'
                                  : 'border border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              ✓
                            </div>
                            <span
                              className={`text-sm font-bold leading-tight ${
                                isChecked
                                  ? 'line-through text-slate-500'
                                  : isDarkMode
                                  ? 'text-white'
                                  : 'text-slate-900'
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          <span className="text-[11px] font-mono text-slate-500">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Scaled Measurement Highlight */}
                        <div
                          className={`mt-2 pt-2 border-t flex items-baseline justify-between ${
                            isDarkMode ? 'border-slate-800' : 'border-violet-100'
                          }`}
                        >
                          <div>
                            <span className="text-xs text-slate-400 block">
                              {t.requiredAmount}
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span
                                className={`text-xl font-extrabold font-mono tracking-tight ${
                                  isDarkMode ? 'text-violet-300' : 'text-violet-700'
                                }`}
                              >
                                {formattedNewQty}
                              </span>
                              <span
                                className={`text-sm font-semibold capitalize ${
                                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                }`}
                              >
                                {item.unit}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[11px] text-slate-400 block">
                              {t.originalText}
                            </span>
                            <span className="text-xs font-medium text-slate-400">
                              {formattedOrigQty} {item.unit}
                            </span>
                          </div>
                        </div>

                        {/* Relative shift indicator */}
                        <div className="mt-2 pt-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span>
                            {t.ratioText}: {scaledResults.scaleFactor.toFixed(2)}×
                          </span>
                          <span
                            className={
                              item.percentChange >= 0
                                ? 'text-emerald-400 font-semibold'
                                : 'text-amber-400 font-semibold'
                            }
                          >
                            {item.percentChange >= 0
                              ? `+${item.percentChange.toFixed(0)}%`
                              : `${item.percentChange.toFixed(0)}%`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kitchen Calculation Breakdown & Chef Tips */}
              <div
                className={`border rounded-xl p-4 sm:p-5 text-xs space-y-2 transition-colors ${
                  isDarkMode
                    ? 'bg-slate-950/70 border-violet-900/60 text-slate-300'
                    : 'bg-violet-50/50 border-violet-200/80 text-slate-700'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-bold ${
                    isDarkMode ? 'text-violet-200' : 'text-violet-950'
                  }`}
                >
                  <Info className="w-4 h-4 text-violet-500" />
                  {t.calculationProofTitle}
                </div>
                <p className="leading-relaxed">
                  {t.formulaApplied}:{' '}
                  <span
                    className={`font-semibold font-mono px-2 py-0.5 rounded border ${
                      isDarkMode
                        ? 'bg-slate-900 border-violet-800 text-violet-200'
                        : 'bg-white border-violet-200 text-violet-950'
                    }`}
                  >
                    New Quantity = Original Quantity × ({presentPeople} / {originalServings})
                  </span>
                  .
                </p>
                <div
                  className={`pt-2 border-t flex flex-wrap gap-x-6 gap-y-1 text-[11px] ${
                    isDarkMode
                      ? 'border-slate-800 text-slate-400'
                      : 'border-violet-200/60 text-slate-600'
                  }`}
                >
                  <span>
                    💡 <strong>Chef Tip:</strong> {t.chefTip}
                  </span>
                  <span>
                    🍳 <strong>Cookware:</strong> {t.cookwareTip}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Google Drive Saved Recipes Modal */}
      {driveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className={`w-full max-w-xl rounded-2xl border shadow-2xl p-6 space-y-5 max-h-[85vh] flex flex-col ${
              isDarkMode
                ? 'bg-slate-900 border-violet-900/80 text-white'
                : 'bg-white border-violet-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-violet-500" />
                <h3 className="text-lg font-bold">{t.driveModalTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDriveModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
              {isDriveLoading ? (
                <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                  <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p>Connecting to Google Drive...</p>
                </div>
              ) : driveFiles.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                  <FolderOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                  <p>{t.noDriveRecipes}</p>
                </div>
              ) : (
                driveFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                      isDarkMode
                        ? 'bg-slate-850 border-slate-750 hover:border-violet-700'
                        : 'bg-violet-50/40 border-violet-100 hover:border-violet-300'
                    }`}
                  >
                    <div className="space-y-0.5 truncate flex-1">
                      <h4 className="text-sm font-bold truncate">
                        {file.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {new Date(file.modifiedTime || file.createdTime).toLocaleDateString()}{' '}
                        · {new Date(file.modifiedTime || file.createdTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-violet-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open in Google Drive"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleLoadDriveRecipe(file.id)}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-violet-700 hover:bg-violet-800 text-white transition-colors cursor-pointer"
                      >
                        {t.loadFromDrive}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetFile(file)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title={t.deleteFromDrive}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setDriveModalOpen(false)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                    : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY Confirmation Dialog for Destructive Delete Operations */}
      {deleteTargetFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4 ${
              isDarkMode
                ? 'bg-slate-900 border-rose-900/60 text-white'
                : 'bg-white border-rose-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-500">
                  {t.deleteConfirmTitle}
                </h3>
                <p className="text-xs text-slate-400 truncate max-w-[260px]">
                  {deleteTargetFile.name}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.deleteConfirmMsg}
            </p>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTargetFile(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                {t.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="no-print max-w-6xl mx-auto px-4 sm:px-6 pt-12 text-center text-xs text-slate-500">
        <p>{t.footerNote}</p>
      </footer>
    </div>
  );
}
