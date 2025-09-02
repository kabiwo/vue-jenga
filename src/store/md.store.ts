import { defineStore } from "pinia";
import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async'
import MarkdownItAsync from 'markdown-it-async'
import { codeToHtml } from 'shiki'
import anchor from 'markdown-it-anchor'

export const useMdStore = defineStore("mdStore", () => {

  const md = MarkdownItAsync()

  md.use(
    fromAsyncCodeToHtml(
      // Pass the codeToHtml function
      codeToHtml,
      {
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
      }
    )
  )
  // md.use(anchor, {
  //   // permalink: true, // 启用链接
  //   // permalinkClass: 'direct-link', // 设置链接的 class
  //   // permalinkSymbol: '#', // 链接符号，默认是 § 符号
  //   permalink: anchor.permalink.linkInsideHeader({
  //     placement: 'before'
  //   })
  // });

  const render = async (mdStr: string) => {
    return await md.renderAsync(mdStr)
  }

  return {
    md,
    render
  }
});