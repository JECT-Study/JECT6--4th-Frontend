import type { ReactNode as ReactNodeType } from 'react'

declare global {
  type ReactNode = ReactNodeType
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export default ReactComponent
}

export {}
