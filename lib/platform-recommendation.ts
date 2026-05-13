import type { Idea } from "@/lib/ideas-data";

export type PlatformKind = "expo" | "swiftui";

export type PlatformRecommendation = {
  kind: PlatformKind;
  label: string;
  shortLabel: string;
  reason: string;
  stack: string[];
};

const IOS_ONLY_OVERRIDES = new Set([
  "check-writer",
  "signature-maker",
]);

const IOS_ONLY_TERMS = [
  "airprint",
  "apple watch",
  "arkit",
  "gamekit",
  "healthkit",
  "imessage",
  "pencilkit",
  "widgetkit",
  "workoutkit",
];

const WATCH_TERMS = [
  "watchkit",
  "watch companion",
  "watch app",
  "apple watch companion",
];

const CROSS_PLATFORM_HINTS = [
  "calculator",
  "counter",
  "quiz",
  "reader",
  "score",
  "scorecard",
  "scorekeeper",
  "scorer",
  "sheet",
  "study",
  "tracker",
  "trainer",
  "planner",
  "converter",
  "guide",
  "scanner",
  "timer",
  "retirement",
  "social security",
  "mini golf",
  "bowling",
  "pickleball",
  "darts",
  "bracket",
];

function ideaText(idea: Idea) {
  return [
    idea.name,
    idea.category,
    idea.group,
    idea.primaryKeyword,
    idea.rankingKeyword,
    idea.concept,
    ...idea.targetKeywords,
    ...idea.features,
  ]
    .join(" ")
    .toLowerCase();
}

function countHits(text: string, terms: string[]) {
  return terms.reduce((count, term) => count + (text.includes(term) ? 1 : 0), 0);
}

function buildExpoStack(idea: Idea) {
  const text = ideaText(idea);
  const stack = [
    "React Native + Expo + TypeScript + Expo Router",
    "Use the existing Expo boilerplate and keep the starter modern and lean",
  ];

  const modules: string[] = [];

  if (/(camera|scan|ocr|barcode|vision)/.test(text)) {
    modules.push("Camera, OCR, and barcode-scanning flow");
  }
  if (/(chart|stats|analytics|history)/.test(text)) {
    modules.push("Charts and local history storage");
  }
  if (/(pdf|export|share|imessage)/.test(text)) {
    modules.push("Sharing and document export");
  }
  if (/(audio|voice|speech|sound|haptics)/.test(text)) {
    modules.push("Audio, voice, and haptics where the app needs them");
  }
  if (/(map|location|course lookup|guide|database)/.test(text)) {
    modules.push("Maps, search, and local data lookup");
  }
  if (/(timer|clock|countdown)/.test(text)) {
    modules.push("Deterministic timer logic");
  }
  if (/(draw|signature|sketch|canvas)/.test(text)) {
    modules.push("Canvas-based drawing surface");
  }
  if (/(watch|watch companion|watch app)/.test(text)) {
    modules.push("Keep the watch companion as a later add-on unless it is core to the MVP");
  }

  return Array.from(new Set([...stack, ...modules, "Local persistence with SQLite or a lightweight store"]));
}

function buildSwiftUIStack(idea: Idea) {
  const base = ["SwiftUI"];
  const translated = idea.implementation
    .filter((step) => !/swiftui/i.test(step))
    .map((step) => {
      if (/SwiftData/i.test(step)) return "SwiftData or an equivalent local persistence layer";
      if (/WatchKit/i.test(step)) return "WatchKit companion where the product genuinely benefits from it";
      if (/ShareLink/i.test(step)) return "System sharing and export";
      if (/PDFKit/i.test(step)) return "PDF export and document generation";
      if (/Charts/i.test(step)) return "Charts framework";
      if (/PencilKit/i.test(step)) return "PencilKit drawing surface";
      if (/AirPrint/i.test(step)) return "AirPrint print flow";
      if (/Vision/i.test(step)) return "Vision-based OCR or barcode capture";
      if (/Core Motion/i.test(step)) return "Motion and sensor input";
      if (/AVFoundation/i.test(step)) return "AVFoundation media capture and playback";
      if (/PhotosUI/i.test(step)) return "Photo picker and image import";
      if (/MapKit/i.test(step)) return "MapKit and location services";
      return step;
    });

  return Array.from(new Set([...base, ...translated]));
}

export function getPlatformRecommendation(idea: Idea): PlatformRecommendation {
  if (IOS_ONLY_OVERRIDES.has(idea.slug)) {
    return {
      kind: "swiftui",
      label: "SwiftUI",
      shortLabel: "SwiftUI",
      reason: "This idea is Apple-first and benefits from a native drawing or printing flow.",
      stack: buildSwiftUIStack(idea),
    };
  }

  const text = ideaText(idea);
  const iosOnlyHits = countHits(text, IOS_ONLY_TERMS);
  const watchHits = countHits(text, WATCH_TERMS);
  const crossPlatformHits = countHits(text, CROSS_PLATFORM_HINTS);
  const watchCompanionOnly = watchHits > 0 && !/(score|tracker|calculator|planner|quiz|trainer|guide|sheet|counter|converter|scanner|timer|retirement|social security|mini golf|bowling|pickleball|darts|bracket)/.test(text);

  if (iosOnlyHits > 0 && crossPlatformHits === 0) {
    return {
      kind: "swiftui",
      label: "SwiftUI",
      shortLabel: "SwiftUI",
      reason: "The core workflow depends on Apple-only APIs or Apple-native document flows.",
      stack: buildSwiftUIStack(idea),
    };
  }

  if (watchCompanionOnly && crossPlatformHits === 0) {
    return {
      kind: "swiftui",
      label: "SwiftUI",
      shortLabel: "SwiftUI",
      reason: "The idea is centered on an Apple Watch-first experience rather than a platform-neutral phone app.",
      stack: buildSwiftUIStack(idea),
    };
  }

  if (crossPlatformHits > 0 || iosOnlyHits === 0) {
    return {
      kind: "expo",
      label: "React Native + Expo",
      shortLabel: "Expo / RN",
      reason: "The core workflow is platform-neutral, so a shared iOS/Android codebase is the better first build.",
      stack: buildExpoStack(idea),
    };
  }

  return {
    kind: "swiftui",
    label: "SwiftUI",
    shortLabel: "SwiftUI",
    reason: "This app is a better native fit for the Apple stack.",
    stack: buildSwiftUIStack(idea),
  };
}
