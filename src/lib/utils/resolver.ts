import { flat } from "radash";

// copy & edit from element-plus-resolver


const fromAndEffectInfo: Record<string, string[]> = {
  VjMenu: ['menu', 'scrollbar', 'menu', 'menu-item', 'menu-item-group', 'sub-menu'],
  VjTable: ['table', 'table', 'pagination', 'empty', 'table-column'],
  VjConfirm: ['utils', 'message-box'],
};

const utilsCollect = [
  'VjInit',
  'VjConfBase',
  'useVjConfStore',

  'VjBlobToStr',
  'VjBlobToUrl',
  'VjDownFile',
  
  'VjOptionsFromEnum',

  'VjGet',
  'VjPost',
  'VjPut',
  'VjDel',
  'VjRequestGetConf',
  'VjRequestInit',
  'VjRequestSetConf',

  'VjResolver',
]

export interface ImportInfo {
  as?: string
  name?: string
  from: string
}

export type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined

export interface ComponentInfo extends ImportInfo {
  sideEffects?: SideEffectsInfo
}

export type Awaitable<T> = T | PromiseLike<T>

export type ComponentResolveResult = Awaitable<string | ComponentInfo | null | undefined | void>

export type ComponentResolverFunction = (name: string) => ComponentResolveResult
export interface ComponentResolverObject {
  type: 'component' | 'directive'
  resolve: ComponentResolverFunction
}
export type ComponentResolver = ComponentResolverFunction | ComponentResolverObject

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

export interface VjResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]

  /**
   * nightly version
   */
  nightly?: boolean
}

type VjResolverOptionsResolved = Required<Omit<VjResolverOptions, 'exclude'>>
  & Pick<VjResolverOptions, 'exclude'>

function getElSideEffects(dirName: string, options: VjResolverOptionsResolved): SideEffectsInfo | undefined {
  const { importStyle, ssr, nightly } = options
  const themeFolder = nightly ? '@element-plus/nightly/theme-chalk' : 'element-plus/theme-chalk'
  const esComponentsFolder = nightly ? '@element-plus/nightly/es/components' : 'element-plus/es/components'

  if (importStyle === 'sass') {
    return ssr
      ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`]
      : [`${esComponentsFolder}/base/style/index`, `${esComponentsFolder}/${dirName}/style/index`]
  }
  else if (importStyle === true || importStyle === 'css') {
    return ssr
      ? [`${themeFolder}/base.css`, `${themeFolder}/el-${dirName}.css`]
      : [`${esComponentsFolder}/base/style/css`, `${esComponentsFolder}/${dirName}/style/css`]
  }
}

function getSideEffects(elKeys: string[], options: VjResolverOptionsResolved): SideEffectsInfo | undefined {
  let arr = flat(elKeys.map(v => getElSideEffects(v, options)) as string[][]);
  return Array.from(new Set(arr)).concat(['vue-jenga/vue-jenga.css']);
}

function resolveComponent(name: string, options: VjResolverOptionsResolved): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude))
    return

  if (!name.match(/^Vj[A-Z]/) && !name.match(/^useVj[A-Z]/))
    return

  let info = fromAndEffectInfo[name];
  if (!info) {
    if (utilsCollect.includes(name)) {
      return {
        name,
        from: 'vue-jenga/utils'
      };
    }
    console.log(name);
    return;
  }

  return {
    name,
    from: `vue-jenga/${info[0]}`,
    sideEffects: getSideEffects(info.slice(1), options),
  }
}

function resolveDirective(name: string, options: VjResolverOptionsResolved): ComponentInfo | undefined {
  if (!options.directives)
    return

  const directives: Record<string, {from: string, effects: string[]}> = {
  }

  const directive = directives[name]
  if (!directive)
    return

  return {
    name: name,
    from: directive.from,
    sideEffects: getSideEffects([name], options),
  }
}

const noStylesComponents: string[] = [];

export function VjResolver(
  options: VjResolverOptions = {},
): ComponentResolver[] {
  let optionsResolved: VjResolverOptionsResolved

  async function resolveOptions() {
    if (optionsResolved)
      return optionsResolved
    optionsResolved = {
      ssr: false,
      importStyle: 'css',
      directives: true,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      nightly: false,
      ...options,
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        const options = await resolveOptions()

        if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
          return resolveComponent(name, { ...options, importStyle: false })
        else return resolveComponent(name, options)
      },
    },
    {
      type: 'directive',
      resolve: async (name: string) => {
        return resolveDirective(name, await resolveOptions())
      },
    },
  ]
}