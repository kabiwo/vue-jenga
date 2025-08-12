import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetWind3({
      prefix: 'vj-'
    }),
    presetAttributify(),
    presetIcons({
      collections: {
        ep: () => import("@iconify-json/ep/icons.json").then((i) => i.default),
        custom: FileSystemIconLoader("./src/assets/svg", (svg) =>
          svg.replace(/#fff/, "currentColor"),
        ),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})