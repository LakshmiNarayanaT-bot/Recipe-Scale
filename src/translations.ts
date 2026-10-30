/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'ml';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
];

export interface IngredientExample {
  name: string;
  amount: string;
  unit: string;
}

export interface TranslationStrings {
  appTitle: string;
  tagline: string;
  smartProportions: string;
  heroHeadline: string;
  heroDesc: string;
  testRecipesTitle: string;
  testRecipesSubtitle: string;
  instantLoad: string;
  editInputs: string;
  scaleNow: string;
  baseServings: string;
  scaleTo: string;
  servingsUnit: string;
  peopleUnit: string;
  recipeParameters: string;
  recipeParametersSubtitle: string;
  dishNameLabel: string;
  dishNamePlaceholder: string;
  dishNameDesc: string;
  originalServingLabel: string;
  originalServingSub: string;
  originalServingDesc: string;
  presentPeopleLabel: string;
  presentPeopleSub: string;
  presentPeopleDesc: string;
  quickMultipliers: string;
  ingredientsTitle: string;
  ingredientsSubtitle: string;
  addIngredient: string;
  primaryIngredient: string;
  ingredientIndex: string;
  ingredientNameLabel: string;
  ingredientNamePlaceholder: string;
  origQuantityLabel: string;
  unitsLabel: string;
  formulaNote: string;
  clearAll: string;
  scaleRecipeBtn: string;
  cannotScale: string;
  positiveValuesHint: string;
  readyTitle: string;
  readyDesc: string;
  scaledResultsBadge: string;
  multiplierText: string;
  adjustedSentence: string;
  baselineCard: string;
  targetCard: string;
  scaleFactorCard: string;
  scaledUp: string;
  scaledDown: string;
  checklistTitle: string;
  checklistSubtitle: string;
  requiredAmount: string;
  originalText: string;
  ratioText: string;
  formatFractions: string;
  formatDecimals: string;
  copyRecipe: string;
  copied: string;
  printSheet: string;
  calculationProofTitle: string;
  formulaApplied: string;
  chefTip: string;
  cookwareTip: string;
  footerNote: string;
  errorOriginalEmpty: string;
  errorOriginalZeroOrNeg: string;
  errorPresentEmpty: string;
  errorPresentZeroOrNeg: string;
  errorNoIngredients: string;
  // Examples fields
  examplePrefix: string;
  amountWord: string;
  defaultDishExample: string;
  useExampleBtn: string;
  ingredientExamples: IngredientExample[];
  // Google Drive fields
  signInWithGoogle: string;
  signOut: string;
  driveConnected: string;
  saveToDrive: string;
  savingToDrive: string;
  savedToDriveSuccess: string;
  viewDriveRecipes: string;
  noDriveRecipes: string;
  driveModalTitle: string;
  loadFromDrive: string;
  deleteFromDrive: string;
  deleteConfirmTitle: string;
  deleteConfirmMsg: string;
  cancel: string;
  confirmDelete: string;
  googleDriveNote: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    appTitle: 'Recipe Scale',
    tagline: 'Kitchen Recipe Portion & Serving Calculator',
    smartProportions: 'Smart Portion Proportions',
    heroHeadline: 'Scale Any Recipe to Fit Your Table',
    heroDesc:
      'Have a recipe for a set number of servings and need it for a different number of people? Adjust ingredient quantities instantly with culinary precision.',
    testRecipesTitle: 'Featured Test Recipes & Cuisines',
    testRecipesSubtitle:
      'Choose an aesthetic recipe below to preview realistic culinary images and test portion scaling.',
    instantLoad: '1-Click Instant Load',
    editInputs: 'Edit Inputs',
    scaleNow: 'Scale',
    baseServings: 'Base',
    scaleTo: 'Scale to',
    servingsUnit: 'servings',
    peopleUnit: 'people',
    recipeParameters: 'Recipe & Serving Parameters',
    recipeParametersSubtitle:
      'Enter your recipe name and compare the original servings against your target table count.',
    dishNameLabel: '1. Dish Name',
    dishNamePlaceholder: 'eg: Vegetable Fried Rice',
    dishNameDesc: 'Name of the meal, dessert, or culinary dish.',
    originalServingLabel: '2. Original Serving',
    originalServingSub: 'recipe baseline',
    originalServingDesc: 'Yield stated in the original recipe.',
    presentPeopleLabel: '3. Present People',
    presentPeopleSub: 'target guests',
    presentPeopleDesc: 'Actual number of diners to cook for.',
    quickMultipliers: 'Quick Multipliers',
    ingredientsTitle: '4. Recipe Ingredients',
    ingredientsSubtitle:
      'Specify ingredient names, original quantities, and measurement units in custom modular box shapes.',
    addIngredient: 'Add Ingredient',
    primaryIngredient: 'Primary Ingredient',
    ingredientIndex: 'Ingredient',
    ingredientNameLabel: 'Ingredient Name',
    ingredientNamePlaceholder: 'eg: Basmati Rice',
    origQuantityLabel: 'Orig. Quantity',
    unitsLabel: 'Units',
    formulaNote: 'Formula: New Quantity = Original × (Present People / Original Servings)',
    clearAll: 'Clear All',
    scaleRecipeBtn: 'Scale Recipe',
    cannotScale: 'Cannot Scale Recipe',
    positiveValuesHint:
      'Please provide positive values greater than zero for both Original Serving and Present People.',
    readyTitle: 'Ready to Calculate Your Recipe',
    readyDesc:
      'Select one of the cuisine test recipes above or enter your own ingredients, then click "Scale Recipe".',
    scaledResultsBadge: 'SCALED RESULTS',
    multiplierText: 'Multiplier',
    adjustedSentence: 'Proportionally adjusted from {orig} servings to cater for {present} people.',
    baselineCard: 'Original Baseline',
    targetCard: 'Present People (Target)',
    scaleFactorCard: 'Scaling Factor (Multiplier)',
    scaledUp: 'Scaled Up',
    scaledDown: 'Scaled Down',
    checklistTitle: 'Scaled Ingredients Checklist',
    checklistSubtitle: 'Click any item to check off during cooking preparation',
    requiredAmount: 'Required Amount',
    originalText: 'Original',
    ratioText: 'Ratio',
    formatFractions: 'Fractions (½)',
    formatDecimals: 'Decimals (.50)',
    copyRecipe: 'Copy Recipe',
    copied: 'Copied!',
    printSheet: 'Print Sheet',
    calculationProofTitle: 'Calculation Proof & Precision Formula',
    formulaApplied: 'Formula applied',
    chefTip: 'Seasonings and salt scale at ~80% for larger batches (taste as you go).',
    cookwareTip: 'When doubling or tripling, use wider skillets or multiple baking pans.',
    footerNote:
      'Recipe Scale — Built with violet palette styling and culinary precision for home cooks, bakers, and dinner hosts.',
    errorOriginalEmpty: 'Original Serving count is empty. Please enter a valid number greater than zero.',
    errorOriginalZeroOrNeg: 'Original Serving cannot be zero or negative. Original recipe must serve at least 1 or more portions.',
    errorPresentEmpty: 'Present People count is empty. Please enter how many people you want to serve.',
    errorPresentZeroOrNeg: 'Present People cannot be zero or negative. Please enter a positive number of people.',
    errorNoIngredients: 'Please enter at least one ingredient name before scaling.',
    // Examples
    examplePrefix: 'eg:',
    amountWord: 'amount:',
    defaultDishExample: 'Vegetable Fried Rice',
    useExampleBtn: 'Use Example (eg: Fried Rice)',
    ingredientExamples: [
      { name: 'Basmati Rice', amount: '2', unit: 'cups' },
      { name: 'Mixed Vegetables', amount: '250', unit: 'grams' },
      { name: 'Cooking Oil', amount: '2', unit: 'tbsp' },
      { name: 'Soy Sauce', amount: '1.5', unit: 'tbsp' },
    ],
    // Google Drive
    signInWithGoogle: 'Sign in with Google',
    signOut: 'Sign out',
    driveConnected: 'Google Drive Connected',
    saveToDrive: 'Save to Google Drive',
    savingToDrive: 'Saving to Drive...',
    savedToDriveSuccess: 'Saved to Google Drive!',
    viewDriveRecipes: 'Saved in Drive',
    noDriveRecipes: 'No recipes found in your Google Drive yet.',
    driveModalTitle: 'Recipes Saved in Google Drive',
    loadFromDrive: 'Load Recipe',
    deleteFromDrive: 'Delete',
    deleteConfirmTitle: 'Delete Recipe from Google Drive?',
    deleteConfirmMsg: 'Are you sure you want to delete this recipe from your Google Drive? This action cannot be undone.',
    cancel: 'Cancel',
    confirmDelete: 'Delete from Drive',
    googleDriveNote: 'Securely save, sync, and access your scaled recipes in Google Drive.',
  },

  hi: {
    appTitle: 'रेसिपी स्केल (Recipe Scale)',
    tagline: 'रसोई रेसिपी भाग और सर्विंग कैलकुलेटर',
    smartProportions: 'सटीक रसोई अनुपात',
    heroHeadline: 'किसी भी रेसिपी को अपने मेहमानों के अनुसार मापें',
    heroDesc:
      'क्या आपके पास निश्चित लोगों के लिए रेसिपी है और अधिक या कम लोगों के लिए बनाना है? सामग्री की मात्रा तुरंत सटीकता से समायोजित करें।',
    testRecipesTitle: 'परीक्षण व्यंजन और रेसिपी',
    testRecipesSubtitle: 'वास्तविक फ़ोटो देखने और अनुपात जांचने के लिए नीचे दी गई रेसिपी चुनें।',
    instantLoad: '1-क्लिक तुरंत लोड',
    editInputs: 'सामग्री बदलें',
    scaleNow: 'मापें',
    baseServings: 'मूल',
    scaleTo: 'नया माप',
    servingsUnit: 'सर्विंग्स',
    peopleUnit: 'लोग',
    recipeParameters: 'रेसिपी और सर्विंग विवरण',
    recipeParametersSubtitle: 'रेसिपी का नाम लिखें और मूल सर्विंग्स की तुलना नए लोगों की संख्या से करें।',
    dishNameLabel: '१. व्यंजन का नाम',
    dishNamePlaceholder: 'उदा: वेज फ्राइड राइस या पनीर बटर मसाला',
    dishNameDesc: 'तैयार किए जा रहे व्यंजन या मिठाई का नाम।',
    originalServingLabel: '२. मूल सर्विंग',
    originalServingSub: 'रेसिपी आधार',
    originalServingDesc: 'मूल रेसिपी में दी गई सर्विंग संख्या।',
    presentPeopleLabel: '३. वर्तमान लोग',
    presentPeopleSub: 'कुल मेहमान',
    presentPeopleDesc: 'कितने लोगों के लिए भोजन बनाना है।',
    quickMultipliers: 'त्वरित गुणक',
    ingredientsTitle: '४. रेसिपी की सामग्री',
    ingredientsSubtitle: 'सामग्री का नाम, मूल मात्रा और इकाई (ग्राम, कप, लीटर) दर्ज करें।',
    addIngredient: 'सामग्री जोड़ें',
    primaryIngredient: 'मुख्य सामग्री',
    ingredientIndex: 'सामग्री',
    ingredientNameLabel: 'सामग्री का नाम',
    ingredientNamePlaceholder: 'उदा: बासमती चावल',
    origQuantityLabel: 'मूल मात्रा',
    unitsLabel: 'इकाई',
    formulaNote: 'सूत्र: नई मात्रा = मूल मात्रा × (वर्तमान लोग / मूल सर्विंग)',
    clearAll: 'सब साफ़ करें',
    scaleRecipeBtn: 'रेसिपी मापें (Scale Recipe)',
    cannotScale: 'रेसिपी मापी नहीं जा सकती',
    positiveValuesHint: 'कृपया मूल सर्विंग और वर्तमान लोगों के लिए शून्य से अधिक धनात्मक संख्या दर्ज करें।',
    readyTitle: 'गणना के लिए तैयार',
    readyDesc: 'ऊपर कोई रेसिपी चुनें या अपनी सामग्री दर्ज करके "रेसिपी मापें" पर क्लिक करें।',
    scaledResultsBadge: 'मापे गए परिणाम',
    multiplierText: 'गुणक',
    adjustedSentence: '{orig} सर्विंग से बदलकर {present} लोगों के अनुसार अनुपात निर्धारित किया गया।',
    baselineCard: 'मूल सर्विंग संख्या',
    targetCard: 'वर्तमान लोग (लक्ष्य)',
    scaleFactorCard: 'माप गुणक (Multiplier)',
    scaledUp: 'मात्रा बढ़ाई गई',
    scaledDown: 'मात्रा घटाई गई',
    checklistTitle: 'मापी गई सामग्री की सूची',
    checklistSubtitle: 'तैयारी के दौरान टिक लगाने के लिए किसी भी सामग्री पर क्लिक करें',
    requiredAmount: 'आवश्यक मात्रा',
    originalText: 'मूल मात्रा',
    ratioText: 'अनुपात',
    formatFractions: 'भिन्न (½)',
    formatDecimals: 'दशमलव (.50)',
    copyRecipe: 'रेसिपी कॉपी करें',
    copied: 'कॉपी हो गया!',
    printSheet: 'शीट प्रिंट करें',
    calculationProofTitle: 'गणना प्रमाण और सटीक सूत्र',
    formulaApplied: 'लागू किया गया सूत्र',
    chefTip: 'मसाले और नमक बड़ी मात्रा में ~80% ही बढ़ाएं (स्वादानुसार डालें)।',
    cookwareTip: 'मात्रा दोगुनी या तिगुनी करते समय बड़े बर्तन या कई कड़ाही का उपयोग करें।',
    footerNote: 'रेसिपी स्केल — गृहणियों, रसोइयों और भोजन प्रेमियों के लिए सटीक किचन कैलकुलेटर।',
    errorOriginalEmpty: 'मूल सर्विंग खाली है। कृपया शून्य से अधिक संख्या दर्ज करें।',
    errorOriginalZeroOrNeg: 'मूल सर्विंग शून्य या ऋणात्मक नहीं हो सकती।',
    errorPresentEmpty: 'वर्तमान लोगों की संख्या खाली है। कृपया संख्या दर्ज करें।',
    errorPresentZeroOrNeg: 'वर्तमान लोग शून्य या ऋणात्मक नहीं हो सकते।',
    errorNoIngredients: 'कृपया रेसिपी मापने से पहले कम से कम एक सामग्री का नाम दर्ज करें।',
    // Examples
    examplePrefix: 'उदा:',
    amountWord: 'मात्रा:',
    defaultDishExample: 'वेज फ्राइड राइस',
    useExampleBtn: 'उदाहरण भरें (उदा: फ्राइड राइस)',
    ingredientExamples: [
      { name: 'बासमती चावल', amount: '2', unit: 'cups' },
      { name: 'मिक्स सब्ज़ियाँ', amount: '250', unit: 'grams' },
      { name: 'कुकिंग ऑयल', amount: '2', unit: 'tbsp' },
      { name: 'सोया सॉस', amount: '1.5', unit: 'tbsp' },
    ],
    // Google Drive
    signInWithGoogle: 'Google से साइन इन करें',
    signOut: 'साइन आउट',
    driveConnected: 'Google Drive कनेक्टेड',
    saveToDrive: 'Google Drive में सहेजें',
    savingToDrive: 'सहेजा जा रहा है...',
    savedToDriveSuccess: 'Google Drive में सहेज लिया गया!',
    viewDriveRecipes: 'Drive में सहेजी गई रेसिपी',
    noDriveRecipes: 'Google Drive में अभी तक कोई रेसिपी नहीं है।',
    driveModalTitle: 'Google Drive में सहेजी गई रेसिपीज़',
    loadFromDrive: 'रेसिपी खोलें',
    deleteFromDrive: 'हटाएं',
    deleteConfirmTitle: 'Google Drive से रेसिपी हटाएं?',
    deleteConfirmMsg: 'क्या आप वाकई इस रेसिपी को अपने Google Drive से हटाना चाहते हैं? यह वापस नहीं लाया जा सकता।',
    cancel: 'रद्द करें',
    confirmDelete: 'Drive से हटाएं',
    googleDriveNote: 'अपनी रेसिपी को Google Drive में सुरक्षित सहेजें और कभी भी खोलें।',
  },

  te: {
    appTitle: 'రెసిపీ స్కేల్ (Recipe Scale)',
    tagline: 'కిచెన్ రెసిపీ కొలతలు & సర్వింగ్ కాలిక్యులేటర్',
    smartProportions: 'ఖచ్చితమైన కిచెన్ కొలతలు',
    heroHeadline: 'మీ అతిథుల సంఖ్యకు సరిపోయేలా రెసిపీని లెక్కించండి',
    heroDesc:
      'కొంతమందికి సరిపోయే రెసిపీ ఉండి, ఎక్కువ లేదా తక్కువ మందికి చేయాలా? పదార్థాల కొలతలను క్షణాల్లో ఖచ్చితంగా మార్చుకోండి.',
    testRecipesTitle: 'నమూనా వంటకాలు & రుచులు',
    testRecipesSubtitle: 'చిత్రాలను చూసి కొలతలను పరీక్షించడానికి క్రింది రెసిపీని ఎంచుకోండి.',
    instantLoad: '1-క్లిక్ లోడ్',
    editInputs: 'సవరించండి',
    scaleNow: 'లెక్కించు',
    baseServings: 'అసలు',
    scaleTo: 'కొత్తది',
    servingsUnit: 'సర్వింగ్స్',
    peopleUnit: 'వ్యక్తులు',
    recipeParameters: 'రెసిపీ & సర్వింగ్ వివరాలు',
    recipeParametersSubtitle: 'వంటకం పేరును నమోదు చేసి, అసలు సర్వింగ్స్‌తో మీ ప్రస్తుత అతిథులను సరిపోల్చండి.',
    dishNameLabel: '1. వంటకం పేరు',
    dishNamePlaceholder: 'ఉదా: వెజిటబుల్ ఫ్రైడ్ రైస్ లేదా పన్నీర్ కర్రీ',
    dishNameDesc: 'మీరు తయారుచేసే వంటకం లేదా మిఠాయి పేరు.',
    originalServingLabel: '2. అసలు సర్వింగ్',
    originalServingSub: 'రెసిపీ ఆధారం',
    originalServingDesc: 'అసలు రెసిపీలో పేర్కొన్న సర్వింగ్స్ సంఖ్య.',
    presentPeopleLabel: '3. ప్రస్తుత వ్యక్తులు',
    presentPeopleSub: 'అతిథుల సంఖ్య',
    presentPeopleDesc: 'ఎంతమందికి వంట చేయాలనుకుంటున్నారు.',
    quickMultipliers: 'త్వరిత గుణకాలు',
    ingredientsTitle: '4. కావలసిన పదార్థాలు',
    ingredientsSubtitle: 'పదార్థం పేరు, అసలు పరిమాణం మరియు యూనిట్లు (గ్రాములు, కప్పులు, లీటర్లు) నమోదు చేయండి.',
    addIngredient: 'పదార్థాన్ని జోడించండి',
    primaryIngredient: 'ముఖ్య పదార్థం',
    ingredientIndex: 'పదార్థం',
    ingredientNameLabel: 'పదార్థం పేరు',
    ingredientNamePlaceholder: 'ఉదా: బాస్మతి బియ్యం',
    origQuantityLabel: 'అసలు పరిమాణం',
    unitsLabel: 'యూనిట్లు',
    formulaNote: 'సూత్రం: కొత్త పరిమాణం = అసలు పరిమాణం × (ప్రస్తుత వ్యక్తులు / అసలు సర్వింగ్)',
    clearAll: 'అన్నీ తొలగించు',
    scaleRecipeBtn: 'రెసిపీని లెక్కించండి (Scale Recipe)',
    cannotScale: 'రెసిపీని లెక్కించలేము',
    positiveValuesHint: 'దయచేసి అసలు సర్వింగ్ మరియు వ్యక్తుల సంఖ్యకు సున్నా కంటే ఎక్కువ పాజిటివ్ సంఖ్యను నమోదు చేయండి.',
    readyTitle: 'లెక్కించడానికి సిద్ధంగా ఉంది',
    readyDesc: 'పైన ఉన్న నమూనా వంటకాన్ని ఎంచుకోండి లేదా మీ వివరాలు నమోదు చేసి "రెసిపీని లెక్కించండి" పై క్లిక్ చేయండి.',
    scaledResultsBadge: 'లెక్కించిన ఫలితాలు',
    multiplierText: 'గుణకం',
    adjustedSentence: '{orig} సర్వింగ్స్ నుండి {present} మంది వ్యక్తులకు సరిపోయేలా మార్చబడింది.',
    baselineCard: 'అసలు సర్వింగ్స్',
    targetCard: 'ప్రస్తుత వ్యక్తులు (లక్ష్యం)',
    scaleFactorCard: 'స్కేలింగ్ ఫ్యాక్టర్ (గుణకం)',
    scaledUp: 'పెంచబడింది',
    scaledDown: 'తగ్గించబడింది',
    checklistTitle: 'సరిచేసిన పదార్థాల చెక్‌లిస్ట్',
    checklistSubtitle: 'వంట చేసే సమయంలో టిక్ చేయడానికి పదార్థంపై క్లిక్ చేయండి',
    requiredAmount: 'కావలసిన పరిమాణం',
    originalText: 'అసలు',
    ratioText: 'నిష్పత్తి',
    formatFractions: 'భిన్నాలు (½)',
    formatDecimals: 'దశాంశాలు (.50)',
    copyRecipe: 'కాపీ చేయండి',
    copied: 'కాపీ అయ్యింది!',
    printSheet: 'ప్రింట్ చేయండి',
    calculationProofTitle: 'లెక్కింపు విధానం & ఖచ్చితమైన సూత్రం',
    formulaApplied: 'వర్తించిన సూత్రం',
    chefTip: 'పెద్ద పరిమాణంలో వండేటప్పుడు ఉప్పు మరియు మసాలాలను ~80% మాత్రమే పెంచండి.',
    cookwareTip: 'పరిమాణం పెరిగినప్పుడు పెద్ద పాత్రలు లేదా ఎక్కువ బాణలీలు ఉపయోగించండి.',
    footerNote: 'రెసిపీ స్కేల్ — ఇంటి వంట చేసేవారికి, చెఫ్‌లకు అనువైన కొలతల సాధనం.',
    errorOriginalEmpty: 'అసలు సర్వింగ్ సంఖ్య ఖాళీగా ఉంది. దయచేసి సంఖ్యను నమోదు చేయండి.',
    errorOriginalZeroOrNeg: 'అసలు సర్వింగ్ సున్నా లేదా నెగటివ్ కాకూడదు.',
    errorPresentEmpty: 'ప్రస్తుత వ్యక్తుల సంఖ్య ఖాళీగా ఉంది. దయచేసి సంఖ్యను నమోదు చేయండి.',
    errorPresentZeroOrNeg: 'వ్యక్తుల సంఖ్య సున్నా లేదా నెగటివ్ కాకూడదు.',
    errorNoIngredients: 'దయచేసి లెక్కించే ముందు కనీసం ఒక పదార్థం పేరును నమోదు చేయండి.',
    // Examples
    examplePrefix: 'ఉదా:',
    amountWord: 'పరిమాణం:',
    defaultDishExample: 'వెజిటబుల్ ఫ్రైడ్ రైస్',
    useExampleBtn: 'ఉదాహరణ తీసుకోండి (ఉదా: ఫ్రైడ్ రైస్)',
    ingredientExamples: [
      { name: 'బాస్మతి బియ్యం', amount: '2', unit: 'cups' },
      { name: 'కూరగాయలు', amount: '250', unit: 'grams' },
      { name: 'వంట నూనె', amount: '2', unit: 'tbsp' },
      { name: 'సోయా సాస్', amount: '1.5', unit: 'tbsp' },
    ],
    // Google Drive
    signInWithGoogle: 'Google తో సైన్ ఇన్ చేయండి',
    signOut: 'సైన్ అవుట్',
    driveConnected: 'Google Drive కనెక్ట్ అయ్యింది',
    saveToDrive: 'Google Drive లో సేవ్ చేయండి',
    savingToDrive: 'సేవ్ అవుతోంది...',
    savedToDriveSuccess: 'Google Drive లో సేవ్ అయ్యింది!',
    viewDriveRecipes: 'Drive లో సేవ్ చేసిన రెసిపీలు',
    noDriveRecipes: 'Google Drive లో ఇంకా ఎలాంటి రెసిపీలు లేవు.',
    driveModalTitle: 'Google Drive లో సేవ్ చేసిన వంటకాలు',
    loadFromDrive: 'రెసిపీని తెరవండి',
    deleteFromDrive: 'తొలగించు',
    deleteConfirmTitle: 'Google Drive నుండి తొలగించాలా?',
    deleteConfirmMsg: 'ఈ రెసిపీని మీ Google Drive నుండి తొలగించాలనుకుంటున్నారా? దీన్ని తిరిగి పొందలేరు.',
    cancel: 'రద్దు చేయి',
    confirmDelete: 'Drive నుండి తొలగించు',
    googleDriveNote: 'మీ వంటకాలను Google Drive లో భద్రపరుచుకోండి మరియు ఎప్పుడైనా ఉపయోగించండి.',
  },

  kn: {
    appTitle: 'ರೆಸಿಪಿ ಸ್ಕೇಲ್ (Recipe Scale)',
    tagline: 'ಅಡುಗೆ ರೆಸಿಪಿ ಅಳತೆ ಮತ್ತು ಸರ್ವಿಂಗ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    smartProportions: 'ನಿಖರ ಅಡುಗೆ ಪ್ರಮಾಣಗಳು',
    heroHeadline: 'ಯಾವುದೇ ರೆಸಿಪಿಯನ್ನು ನಿಮ್ಮ ಅತಿಥಿಗಳಿಗೆ ತಕ್ಕಂತೆ ಅಳೆಯಿರಿ',
    heroDesc:
      'ಕೆಲವು ಜನರಿಗೆ ಸೀಮಿತವಾದ ರೆಸಿಪಿ ನಿಮ್ಮಲ್ಲಿದ್ದು, ಹೆಚ್ಚು ಜನರಿಗೆ ಮಾಡಬೇಕೆ? ಪದಾರ್ಥಗಳ ಪ್ರಮಾಣವನ್ನು ತಕ್ಷಣವೇ ನಿಖರವಾಗಿ ಹೊಂದಿಸಿ.',
    testRecipesTitle: 'ಮಾದರಿ ಅಡುಗೆಗಳು ಮತ್ತು ತಿನಿಸುಗಳು',
    testRecipesSubtitle: 'ಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಮತ್ತು ಅಳತೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಕೆಳಗಿನ ರೆಸಿಪಿ ಆಯ್ಕೆಮಾಡಿ.',
    instantLoad: '1-ಕ್ಲಿಕ್ ಲೋಡ್',
    editInputs: 'ತಿದ್ದುಪಡಿ',
    scaleNow: 'ಲೆಕ್ಕಿಸಿ',
    baseServings: 'ಮೂಲ',
    scaleTo: 'ಹೊಸದು',
    servingsUnit: 'ಸರ್ವಿಂಗ್ಸ್',
    peopleUnit: 'ಜನರು',
    recipeParameters: 'ರೆಸಿಪಿ ಮತ್ತು ಸರ್ವಿಂಗ್ ವಿವರಗಳು',
    recipeParametersSubtitle: 'ಅಡುಗೆಯ ಹೆಸರನ್ನು ಬರೆದು, ಮೂಲ ಸರ್ವಿಂಗ್ಸ್ ಅನ್ನು ಗುರಿ ಜನರೊಂದಿಗೆ ಹೋಲಿಸಿ.',
    dishNameLabel: '1. ತಿನಿಸಿನ ಹೆಸರು',
    dishNamePlaceholder: 'ಉದಾ: ವೆಜ್ ಫ್ರೈಡ್ ರೈಸ್ ಅಥವಾ ಪಲಾವ್',
    dishNameDesc: 'ನೀವು ತಯಾರಿಸುತ್ತಿರುವ ತಿಂಡಿ ಅಥವಾ ಅಡುಗೆಯ ಹೆಸರು.',
    originalServingLabel: '2. ಮೂಲ ಸರ್ವಿಂಗ್',
    originalServingSub: 'ರೆಸಿಪಿ ಆಧಾರ',
    originalServingDesc: 'ಮೂಲ ರೆಸಿಪಿಯಲ್ಲಿ ನೀಡಲಾದ ಜನರ ಸಂಖ್ಯೆ.',
    presentPeopleLabel: '3. ಪ್ರಸ್ತುತ ಜನರು',
    presentPeopleSub: 'ಅತಿಥಿಗಳು',
    presentPeopleDesc: 'ಎಷ್ಟು ಜನರಿಗೆ ಅಡುಗೆ ಮಾಡಬೇಕಾಗಿದೆ.',
    quickMultipliers: 'ತ್ವರಿತ ಗುಣಕಗಳು',
    ingredientsTitle: '4. ಬೇಕಾಗುವ ಪದಾರ್ಥಗಳು',
    ingredientsSubtitle: 'ಪದಾರ್ಥದ ಹೆಸರು, ಮೂಲ ಪ್ರಮಾಣ ಮತ್ತು ಯೂನಿಟ್ (ಗ್ರಾಂ, ಕಪ್, ಲೀಟರ್) ನಮೂದಿಸಿ.',
    addIngredient: 'ಪದಾರ್ಥ ಸೇರಿಸಿ',
    primaryIngredient: 'ಮುಖ್ಯ ಪದಾರ್ಥ',
    ingredientIndex: 'ಪದಾರ್ಥ',
    ingredientNameLabel: 'ಪದಾರ್ಥದ ಹೆಸರು',
    ingredientNamePlaceholder: 'ಉದಾ: ಬಾಸ್ಮತಿ ಅಕ್ಕಿ',
    origQuantityLabel: 'ಮೂಲ ಪ್ರಮಾಣ',
    unitsLabel: 'ಯೂನಿಟ್',
    formulaNote: 'ಸೂತ್ರ: ಹೊಸ ಪ್ರಮಾಣ = ಮೂಲ ಪ್ರಮಾಣ × (ಪ್ರಸ್ತುತ ಜನರು / ಮೂಲ ಸರ್ವಿಂಗ್)',
    clearAll: 'ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ',
    scaleRecipeBtn: 'ರೆಸಿಪಿ ಲೆಕ್ಕಿಸಿ (Scale Recipe)',
    cannotScale: 'ರೆಸಿಪಿ ಲೆಕ್ಕಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ',
    positiveValuesHint: 'ದಯವಿಟ್ಟು ಮೂಲ ಸರ್ವಿಂಗ್ ಮತ್ತು ಜನರಿಗೆ ಶೂನ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಧನಾತ್ಮಕ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
    readyTitle: 'ಲೆಕ್ಕಾಚಾರಕ್ಕೆ ಸಿದ್ಧವಾಗಿದೆ',
    readyDesc: 'ಮೇಲಿನ ಮಾದರಿಯನ್ನು ಆರಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಪದಾರ್ಥಗಳನ್ನು ನಮೂದಿಸಿ "ರೆಸಿಪಿ ಲೆಕ್ಕಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.',
    scaledResultsBadge: 'ಲೆಕ್ಕಿಸಿದ ಫಲಿತಾಂಶಗಳು',
    multiplierText: 'ಗುಣಕ',
    adjustedSentence: '{orig} ಸರ್ವಿಂಗ್ಸ್‌ನಿಂದ {present} ಜನರಿಗೆ ತಕ್ಕಂತೆ ಪ್ರಮಾಣ ಬದಲಾಯಿಸಲಾಗಿದೆ.',
    baselineCard: 'ಮೂಲ ಸರ್ವಿಂಗ್ಸ್',
    targetCard: 'ಪ್ರಸ್ತುತ ಜನರು (ಗುರಿ)',
    scaleFactorCard: 'ಸ್ಕೇಲಿಂಗ್ ಫ್ಯಾಕ್ಟರ್ (ಗುಣಕ)',
    scaledUp: 'ಹೆಚ್ಚಿಸಲಾಗಿದೆ',
    scaledDown: 'ಕಡಿಮೆಗೊಳಿಸಲಾಗಿದೆ',
    checklistTitle: 'ಹೊಂದಿಸಲಾದ ಪದಾರ್ಥಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    checklistSubtitle: 'ಅಡುಗೆ ತಯಾರಿಯ ಸಮಯದಲ್ಲಿ ಗುರುತು ಮಾಡಲು ಪದಾರ್ಥದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
    requiredAmount: 'ಬೇಕಾದ ಪ್ರಮಾಣ',
    originalText: 'ಮೂಲ',
    ratioText: 'ಅನುಪಾತ',
    formatFractions: 'ಭಿನ್ನರಾಶಿ (½)',
    formatDecimals: 'ದಶಮಾಂಶ (.50)',
    copyRecipe: 'ರೆಸಿಪಿ ಕಾಪಿ ಮಾಡಿ',
    copied: 'ಕಾಪಿಯಾಗಿದೆ!',
    printSheet: 'ಪ್ರಿಂಟ್ ಮಾಡಿ',
    calculationProofTitle: 'ಲೆಕ್ಕಾಚಾರ ವಿವರಣೆ & ನಿಖರ ಸೂತ್ರ',
    formulaApplied: 'ಅನ್ವಯಿಸಲಾದ ಸೂತ್ರ',
    chefTip: 'ಹೆಚ್ಚು ಜನರಿಗೆ ಅಡುಗೆ ಮಾಡುವಾಗ ಉಪ್ಪು ಮತ್ತು ಮಸಾಲೆಗಳನ್ನು ~80% ಮಾತ್ರ ಹೆಚ್ಚಿಸಿ.',
    cookwareTip: 'ಪ್ರಮಾಣ ಹೆಚ್ಚಾದಾಗ ದೊಡ್ಡ ಪಾತ್ರೆಗಳನ್ನು ಬಳಸಿ.',
    footerNote: 'ರೆಸಿಪಿ ಸ್ಕೇಲ್ — ಗೃಹಿಣಿಯರಿಗೆ ಮತ್ತು ಅಡುಗೆ ಪ್ರಿಯರಿಗೆ ನಿಖರ ಪ್ರಮಾಣ ಸಾಧನ.',
    errorOriginalEmpty: 'ಮೂಲ ಸರ್ವಿಂಗ್ ಖಾಲಿ ಇದೆ. ದಯವಿಟ್ಟು ಸರಿಯಾದ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
    errorOriginalZeroOrNeg: 'ಮೂಲ ಸರ್ವಿಂಗ್ ಶೂನ್ಯ ಅಥವಾ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.',
    errorPresentEmpty: 'ಜನರ ಸಂಖ್ಯೆ ಖಾಲಿ ಇದೆ. ದಯವಿಟ್ಟು ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
    errorPresentZeroOrNeg: 'ಜನರ ಸಂಖ್ಯೆ ಶೂನ್ಯ ಅಥವಾ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.',
    errorNoIngredients: 'ದಯವಿಟ್ಟು ಲೆಕ್ಕಾಚಾರ ಮಾಡುವ ಮೊದಲು ಕನಿಷ್ಠ ಒಂದು ಪದಾರ್ಥದ ಹೆಸರು ನಮೂದಿಸಿ.',
    // Examples
    examplePrefix: 'ಉದಾ:',
    amountWord: 'ಪ್ರಮಾಣ:',
    defaultDishExample: 'ವೆಜ್ ಫ್ರೈಡ್ ರೈಸ್',
    useExampleBtn: 'ಉದಾಹರಣೆ ಬಳಸಿ (ಉದಾ: ಫ್ರೈಡ್ ರೈಸ್)',
    ingredientExamples: [
      { name: 'ಬಾಸ್ಮತಿ ಅಕ್ಕಿ', amount: '2', unit: 'cups' },
      { name: 'ತರಕಾರಿಗಳು', amount: '250', unit: 'grams' },
      { name: 'ಅಡುಗೆ ಎಣ್ಣೆ', amount: '2', unit: 'tbsp' },
      { name: 'ಸೋಯಾ ಸಾಸ್', amount: '1.5', unit: 'tbsp' },
    ],
    // Google Drive
    signInWithGoogle: 'Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    signOut: 'ಸೈನ್ ಔಟ್',
    driveConnected: 'Google Drive ಸಂಪರ್ಕಗೊಂಡಿದೆ',
    saveToDrive: 'Google Drive ಗೆ ಉಳಿಸಿ',
    savingToDrive: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
    savedToDriveSuccess: 'Google Drive ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ!',
    viewDriveRecipes: 'Drive ನಲ್ಲಿ ಉಳಿಸಲಾದ ರೆಸಿಪಿಗಳು',
    noDriveRecipes: 'Google Drive ನಲ್ಲಿ ಯಾವುದೇ ರೆಸಿಪಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    driveModalTitle: 'Google Drive ನಲ್ಲಿ ಉಳಿಸಲಾದ ರೆಸಿಪಿಗಳು',
    loadFromDrive: 'ರೆಸಿಪಿ ತೆರೆಯಿರಿ',
    deleteFromDrive: 'ಅಳಿಸಿ',
    deleteConfirmTitle: 'Google Drive ನಿಂದ ಅಳಿಸಬೇಕೇ?',
    deleteConfirmMsg: 'ಈ ರೆಸಿಪಿಯನ್ನು ನಿಮ್ಮ Google Drive ನಿಂದ ಅಳಿಸಲು ಖಚಿತವಾಗಿದೆಯೇ? ಇದನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.',
    cancel: 'ರದ್ದುಮಾಡಿ',
    confirmDelete: 'Drive ನಿಂದ ಅಳಿಸಿ',
    googleDriveNote: 'ನಿಮ್ಮ ರೆಸಿಪಿಗಳನ್ನು Google Drive ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಿ.',
  },

  ta: {
    appTitle: 'ரெசிபி ஸ்கேல் (Recipe Scale)',
    tagline: 'சமையல் ரெசிபி அளவு & பரிமாறும் கால்குலேட்டர்',
    smartProportions: 'துல்லியமான சமையல் அளவுகள்',
    heroHeadline: 'எந்தவொரு செய்முறையையும் உங்கள் விருந்தினருக்கு ஏற்ப அளவிடுங்கள்',
    heroDesc:
      'குறிப்பிட்ட நபர்களுக்கான ரெசிபி உங்களிடம் உள்ளதா? விருந்தினர் எண்ணிக்கைக்கு ஏற்ப தேவையான பொருட்களை உடனே துல்லியமாக கணக்கிடுங்கள்.',
    testRecipesTitle: 'மாதிரி உணவுகள் & சுவைகள்',
    testRecipesSubtitle: 'புகைப்படங்களை பார்த்து அளவுகளை சோதிக்க கீழே உள்ள செய்முறையைத் தேர்ந்தெடுக்கவும்.',
    instantLoad: 'உடனடி ஏற்றுதல்',
    editInputs: 'திருத்துக',
    scaleNow: 'அளவிடு',
    baseServings: 'அசல்',
    scaleTo: 'புதியது',
    servingsUnit: 'பரிமாறல்கள்',
    peopleUnit: 'நபர்கள்',
    recipeParameters: 'செய்முறை மற்றும் பரிமாறும் விவரங்கள்',
    recipeParametersSubtitle: 'உணவின் பெயரை உள்ளிட்டு, அசல் பரிமாறல்களை உங்கள் புதிய விருந்தினர் எண்ணிக்கையுடன் ஒப்பிடவும்.',
    dishNameLabel: '1. உணவின் பெயர்',
    dishNamePlaceholder: 'எ.கா: வெஜ் ஃப்ரைட் ரைஸ் அல்லது சாம்பார் சாதம்',
    dishNameDesc: 'தயாரிக்கப்படும் உணவு அல்லது இனிப்பின் பெயர்.',
    originalServingLabel: '2. அசல் பரிமாறல்',
    originalServingSub: 'ரெசிபி அடிப்படை',
    originalServingDesc: 'அசல் செய்முறையில் குறிப்பிடப்பட்டுள்ள நபர்களின் எண்ணிக்கை.',
    presentPeopleLabel: '3. தற்போதைய நபர்கள்',
    presentPeopleSub: 'மொத்த விருந்தினர்கள்',
    presentPeopleDesc: 'எத்தனை நபர்களுக்கு சமைக்க வேண்டும்.',
    quickMultipliers: 'விரைவு பெருக்கிகள்',
    ingredientsTitle: '4. தேவையான பொருட்கள்',
    ingredientsSubtitle: 'பொருளின் பெயர், அசல் அளவு மற்றும் அலகுகள் (கிராம், கப், லிட்டர்) உள்ளிடவும்.',
    addIngredient: 'பொருள் சேர்க்க',
    primaryIngredient: 'முக்கிய பொருள்',
    ingredientIndex: 'பொருள்',
    ingredientNameLabel: 'பொருளின் பெயர்',
    ingredientNamePlaceholder: 'எ.கா: பாசுமதி அரிசி',
    origQuantityLabel: 'அசல் அளவு',
    unitsLabel: 'அலகு',
    formulaNote: 'சூத்திரம்: புதிய அளவு = அசல் அளவு × (தற்போதைய நபர்கள் / அசல் பரிமாறல்)',
    clearAll: 'அனைத்தையும் அழிக்க',
    scaleRecipeBtn: 'அளவிடுங்கள் (Scale Recipe)',
    cannotScale: 'செய்முறையை அளவிட முடியாது',
    positiveValuesHint: 'அசல் பரிமாறல் மற்றும் நபர்களின் எண்ணிக்கைக்கு பூஜ்ஜியத்தை விட அதிகமான எண்ணை உள்ளிடவும்.',
    readyTitle: 'கணக்கிட தயாராக உள்ளது',
    readyDesc: 'மேலே ஒரு செய்முறையைத் தேர்ந்தெடுக்கவும் அல்லது உங்கள் பொருட்களை உள்ளிட்டு "அளவிடுங்கள்" பொத்தானை அழுத்தவும்.',
    scaledResultsBadge: 'அளவிடப்பட்ட முடிவுகள்',
    multiplierText: 'பெருக்கி',
    adjustedSentence: '{orig} பரிமாறல்களிலிருந்து {present} நபர்களுக்கு ஏற்றவாறு விகிதம் மாற்றப்பட்டுள்ளது.',
    baselineCard: 'அசல் பரிமாறல் எண்ணிக்கை',
    targetCard: 'தற்போதைய நபர்கள் (இலக்கு)',
    scaleFactorCard: 'அளவு பெருக்கி (Multiplier)',
    scaledUp: 'அதிகரிக்கப்பட்டது',
    scaledDown: 'குறைக்கப்பட்டது',
    checklistTitle: 'அளவிடப்பட்ட பொருட்களின் பட்டியல்',
    checklistSubtitle: 'சமைக்கும் போது டிக் செய்ய பொருளின் மீது கிளிக் செய்யவும்',
    requiredAmount: 'தேவையான அளவு',
    originalText: 'அசல்',
    ratioText: 'விகிதம்',
    formatFractions: 'பின்னங்கள் (½)',
    formatDecimals: 'தசமங்கள் (.50)',
    copyRecipe: 'நகலெடுக்க',
    copied: 'நகலெடுக்கப்பட்டது!',
    printSheet: 'அச்சிடுக',
    calculationProofTitle: 'கணக்கீட்டு விளக்கம் & துல்லிய சூத்திரம்',
    formulaApplied: 'பயன்படுத்தப்பட்ட சூத்திரம்',
    chefTip: 'அதிக நபர்களுக்கு சமைக்கும் போது மசாலா மற்றும் உப்பை ~80% மட்டுமே அதிகரிக்கவும்.',
    cookwareTip: 'அளவை அதிகரிக்கும் போது பெரிய பாத்திரங்களை பயன்படுத்தவும்.',
    footerNote: 'ரெசிபி ஸ்கேல் — இல்லத்தரசிகள் மற்றும் சமையல் ஆர்வலர்களுக்கான துல்லிய கணக்கீட்டு தளம்.',
    errorOriginalEmpty: 'அசல் பரிமாறல் எண் காலியாக உள்ளது. தயவுசெய்து எண்ணை உள்ளிடவும்.',
    errorOriginalZeroOrNeg: 'அசல் பரிமாறல் பூஜ்ஜியம் அல்லது எதிர்மறையாக இருக்கக்கூடாது.',
    errorPresentEmpty: 'நபர்களின் எண்ணிக்கை காலியாக உள்ளது. தயவுசெய்து உள்ளிடவும்.',
    errorPresentZeroOrNeg: 'நபர்களின் எண்ணிக்கை பூஜ்ஜியம் அல்லது எதிர்மறையாக இருக்கக்கூடாது.',
    errorNoIngredients: 'தயவுசெய்து அளவிடுவதற்கு முன் ஒரு பொருளின் பெயரையாவது உள்ளிடவும்.',
    // Examples
    examplePrefix: 'எ.கா:',
    amountWord: 'அளவு:',
    defaultDishExample: 'வெஜ் ஃப்ரைட் ரைஸ்',
    useExampleBtn: 'மாதிரியைப் பயன்படுத்து (எ.கா: ஃப்ரைட் ரைஸ்)',
    ingredientExamples: [
      { name: 'பாசுமதி அரிசி', amount: '2', unit: 'cups' },
      { name: 'காய்கறிகள்', amount: '250', unit: 'grams' },
      { name: 'சமையல் எண்ணெய்', amount: '2', unit: 'tbsp' },
      { name: 'சோயா சாஸ்', amount: '1.5', unit: 'tbsp' },
    ],
    // Google Drive
    signInWithGoogle: 'Google மூலம் உள்நுழைக',
    signOut: 'வெளியேறு',
    driveConnected: 'Google Drive இணைக்கப்பட்டது',
    saveToDrive: 'Google Drive இல் சேமிக்க',
    savingToDrive: 'சேமிக்கப்படுகிறது...',
    savedToDriveSuccess: 'Google Drive இல் சேமிக்கப்பட்டது!',
    viewDriveRecipes: 'Drive இல் உள்ள ரெசிபிகள்',
    noDriveRecipes: 'Google Drive இல் ரெசிபிகள் எதுவும் இல்லை.',
    driveModalTitle: 'Google Drive இல் சேமிக்கப்பட்ட ரெசிபிகள்',
    loadFromDrive: 'செய்முறையைத் திறக்க',
    deleteFromDrive: 'நீக்குக',
    deleteConfirmTitle: 'Google Drive இலிருந்து நீக்கவா?',
    deleteConfirmMsg: 'இந்த ரெசிபியை உங்கள் Google Drive இலிருந்து நீக்க விரும்புகிறீர்களா? இதை மீட்டெடுக்க முடியாது.',
    cancel: 'ரத்து செய்',
    confirmDelete: 'Drive இலிருந்து நீக்குக',
    googleDriveNote: 'உங்கள் ரெசிபிகளை Google Drive இல் பாதுகாப்பாக சேமித்து அணுகுங்கள்.',
  },

  ml: {
    appTitle: 'റെസിപ്പി സ്കെയിൽ (Recipe Scale)',
    tagline: 'അടുക്കള റെസിപ്പി അളവും സെർവിങ് കാൽക്കുലേറ്ററും',
    smartProportions: 'കൃത്യമായ അടുക്കള അളവുകൾ',
    heroHeadline: 'ഏതൊരു പാചകക്കുറിപ്പും നിങ്ങളുടെ അതിഥികൾക്കായി കൃത്യമായി അളക്കൂ',
    heroDesc:
      'കുറച്ചുപേർക്കുള്ള പാചകക്കുറിപ്പ് കൂടുതൽ ആളുകൾക്കായി ഉണ്ടാക്കണമോ? ചേരുവകളുടെ അളവ് നിമിഷങ്ങൾക്കുള്ളിൽ കൃത്യമായി കണക്കാക്കുക.',
    testRecipesTitle: 'മാതൃകാ വിഭവങ്ങളും രുചികളും',
    testRecipesSubtitle: 'ചിത്രങ്ങൾ കാണാനും അളവുകൾ പരിശോധിക്കാനും താഴെയുള്ള പാചകക്കുറിപ്പ് തിരഞ്ഞെടുക്കുക.',
    instantLoad: 'പെട്ടെന്ന് ലോഡ് ചെയ്യുക',
    editInputs: 'മാറ്റം വരുത്തുക',
    scaleNow: 'അളക്കുക',
    baseServings: 'യഥാർത്ഥം',
    scaleTo: 'പുതിയത്',
    servingsUnit: 'സെർവിങ്സ്',
    peopleUnit: 'ആളുകൾ',
    recipeParameters: 'റെസിപ്പിയും സെർവിങ് വിവരങ്ങളും',
    recipeParametersSubtitle: 'വിഭവത്തിന്റെ പേര് നൽകി, യഥാർത്ഥ സെർവിങ്സ് നിങ്ങളുടെ പുതിയ അതിഥികളുമായി താരതമ്യം ചെയ്യുക.',
    dishNameLabel: '1. വിഭവത്തിന്റെ പേര്',
    dishNamePlaceholder: 'ഉദാ: വെജ് ഫ്രൈഡ് റൈസ് അല്ലെങ്കിൽ ചോറും കറിയും',
    dishNameDesc: 'തയ്യാറാക്കുന്ന വിഭവത്തിന്റെയോ മധുരപലഹാരത്തിന്റെയോ പേര്.',
    originalServingLabel: '2. യഥാർത്ഥ സെർവിങ്',
    originalServingSub: 'റെസിപ്പി അടിസ്ഥാനം',
    originalServingDesc: 'യഥാർത്ഥ പാചകക്കുറിപ്പിൽ പറയുന്ന ആളുകളുടെ എണ്ണം.',
    presentPeopleLabel: '3. നിലവിലെ ആളുകൾ',
    presentPeopleSub: 'മൊത്തം അതിഥികൾ',
    presentPeopleDesc: 'എത്ര ആളുകൾക്കാണ് പാചകം ചെയ്യേണ്ടത്.',
    quickMultipliers: 'പെട്ടെന്നുള്ള ഗുണിതങ്ങൾ',
    ingredientsTitle: '4. ആവശ്യമായ ചേരുവകൾ',
    ingredientsSubtitle: 'ചേരുവയുടെ പേര്, യഥാർത്ഥ അളവ്, യൂണിറ്റ് (ഗ്രാം, കപ്പ്, ലിറ്റർ) നൽകുക.',
    addIngredient: 'ചേരുവ ചേർക്കുക',
    primaryIngredient: 'പ്രധാന ചേരുവ',
    ingredientIndex: 'ചേരുവ',
    ingredientNameLabel: 'ചേരുവയുടെ പേര്',
    ingredientNamePlaceholder: 'ഉദാ: ബസ്മതി അരി',
    origQuantityLabel: 'യഥാർത്ഥ അളവ്',
    unitsLabel: 'യൂണിറ്റ്',
    formulaNote: 'സൂത്രവാക്യം: പുതിയ അളവ് = യഥാർത്ഥ അളവ് × (നിലവിലെ ആളുകൾ / യഥാർത്ഥ സെർവിങ്)',
    clearAll: 'എല്ലാം മായ്ക്കുക',
    scaleRecipeBtn: 'അളവ് കണക്കാക്കുക (Scale Recipe)',
    cannotScale: 'കണക്കാക്കാൻ സാധ്യമല്ല',
    positiveValuesHint: 'സെർവിങ്സിനും ആളുകളുടെ എണ്ണത്തിനും പൂജ്യത്തേക്കാൾ വലിയ പോസിറ്റീവ് സംഖ്യ നൽകുക.',
    readyTitle: 'കണക്കാക്കാൻ തയ്യാറാണ്',
    readyDesc: 'മുകളിൽ ഒരു വിഭവം തിരഞ്ഞെടുക്കുകയോ വിവരങ്ങൾ നൽകി "അളവ് കണക്കാക്കുക" ക്ലിക്ക് ചെയ്യുകയോ ചെയ്യുക.',
    scaledResultsBadge: 'കണക്കാക്കിയ ഫലങ്ങൾ',
    multiplierText: 'ഗുണിതം',
    adjustedSentence: '{orig} സെർവിങ്സിൽ നിന്ന് {present} ആളുകൾക്ക് അനുയോജ്യമായി മാറ്റിയെടുത്തു.',
    baselineCard: 'യഥാർത്ഥ സെർവിങ്സ്',
    targetCard: 'നിലവിലെ ആളുകൾ (ലക്ഷ്യം)',
    scaleFactorCard: 'സ്കെയിലിംഗ് ഗുണിതം (Multiplier)',
    scaledUp: 'വർദ്ധിപ്പിച്ചു',
    scaledDown: 'കുറച്ചു',
    checklistTitle: 'കണക്കാക്കിയ ചേരുവകളുടെ പട്ടിക',
    checklistSubtitle: 'പാചകത്തിനിടയിൽ അടയാളപ്പെടുത്താൻ ചേരുവയിൽ ക്ലിക്ക് ചെയ്യുക',
    requiredAmount: 'ആവശ്യമായ അളവ്',
    originalText: 'യഥാർത്ഥം',
    ratioText: 'അനുപാതം',
    formatFractions: 'ഭിന്നസംഖ്യ (½)',
    formatDecimals: 'ദശാംശം (.50)',
    copyRecipe: 'പകർപ്പുക (Copy)',
    copied: 'പകർപ്പിച്ചു!',
    printSheet: 'പ്രിന്റ് ചെയ്യുക',
    calculationProofTitle: 'കണക്കുകൂട്ടൽ വിശദീകരണം & കൃത്യമായ സൂത്രവാക്യം',
    formulaApplied: 'ഉപയോഗിച്ച സൂത്രവാക്യം',
    chefTip: 'കൂടുതൽ അളവിൽ പാചകം ചെയ്യുമ്പോൾ ഉപ്പും മസാലകളും ~80% മാത്രം വർദ്ധിപ്പിക്കുക.',
    cookwareTip: 'അളവ് കൂടുമ്പോൾ വലിയ പാത്രങ്ങൾ ഉപയോഗിക്കുക.',
    footerNote: 'റെസിപ്പി സ്കെയിൽ — വീട്ടുപാചകക്കാർക്കും ഷെഫുകൾക്കുമായുള്ള കൃത്യമായ അടുക്കള സഹായി.',
    errorOriginalEmpty: 'യഥാർത്ഥ സെർവിങ്സ് ശൂന്യമാണ്. ദയവായി സംഖ്യ നൽകുക.',
    errorOriginalZeroOrNeg: 'യഥാർത്ഥ സെർവിങ്സ് പൂജ്യമാകാനോ നെഗറ്റീവ് ആകാനോ പാടില്ല.',
    errorPresentEmpty: 'ആളുകളുടെ എണ്ണം ശൂന്യമാണ്. ദയവായി സംഖ്യ നൽകുക.',
    errorPresentZeroOrNeg: 'ആളുകളുടെ എണ്ണം പൂജ്യമാകാനോ നെഗറ്റീവ് ആകാനോ പാടില്ല.',
    errorNoIngredients: 'കണക്കാക്കുന്നതിന് മുൻപ് ചുരുങ്ങിയത് ഒരു ചേരുവയുടെ പേരെങ്കിലും നൽകുക.',
    // Examples
    examplePrefix: 'ഉദാ:',
    amountWord: 'അളവ്:',
    defaultDishExample: 'വെജ് ഫ്രൈഡ് റൈസ്',
    useExampleBtn: 'ഉദാഹരണം ഉപയോഗിക്കുക (ഉദാ: ഫ്രൈഡ് റൈസ്)',
    ingredientExamples: [
      { name: 'ബസ്മതി അരി', amount: '2', unit: 'cups' },
      { name: 'പച്ചക്കറികൾ', amount: '250', unit: 'grams' },
      { name: 'വെളിച്ചെണ്ണ', amount: '2', unit: 'tbsp' },
      { name: 'സോയ സോസ്', amount: '1.5', unit: 'tbsp' },
    ],
    // Google Drive
    signInWithGoogle: 'Google ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക',
    signOut: 'സൈൻ ഔട്ട്',
    driveConnected: 'Google Drive കണക്റ്റ് ചെയ്തു',
    saveToDrive: 'Google Drive-ൽ സേവ് ചെയ്യുക',
    savingToDrive: 'സേവ് ചെയ്യുന്നു...',
    savedToDriveSuccess: 'Google Drive-ൽ സേവ് ചെയ്തു!',
    viewDriveRecipes: 'Drive-ൽ സേവ് ചെയ്തവ',
    noDriveRecipes: 'Google Drive-ൽ ഇതുവരെ റെസിപ്പികൾ ഒന്നും കണ്ടെത്തിയില്ല.',
    driveModalTitle: 'Google Drive-ൽ സേവ് ചെയ്ത റെസിപ്പികൾ',
    loadFromDrive: 'റെസിപ്പി തുറക്കുക',
    deleteFromDrive: 'ഡിലീറ്റ് ചെയ്യുക',
    deleteConfirmTitle: 'Google Drive-ൽ നിന്ന് നീക്കം ചെയ്യണമോ?',
    deleteConfirmMsg: 'ഈ റെസിപ്പി നിങ്ങളുടെ Google Drive-ൽ നിന്ന് തീർച്ചയായും നീക്കം ചെയ്യണമോ? ഇത് തിരികെ ലഭിക്കില്ല.',
    cancel: 'റദ്ദാക്കുക',
    confirmDelete: 'Drive-ൽ നിന്ന് നീക്കം ചെയ്യുക',
    googleDriveNote: 'നിങ്ങളുടെ പാചകക്കുറിപ്പുകൾ Google Drive-ൽ സുരക്ഷിതമായി സൂക്ഷിക്കുക.',
  },
};
