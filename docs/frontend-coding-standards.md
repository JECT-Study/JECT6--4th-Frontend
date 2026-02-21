# 프론트엔드 코딩 표준

이 문서는 JECT6 4th Frontend(Next.js) 프로젝트의 코딩 표준과 모범 사례를 정의합니다.

**최종 업데이트:** 2026년 2월

이 프로젝트에서는 **상태 관리**에 **Jotai**, **스타일링**에 **Emotion**을 사용합니다. 각 라이브러리 사용 규칙은 아래 섹션을 참고하세요.

## 목차

1. [코드 품질 철학](#코드-품질-철학)
2. [TypeScript 가이드라인](#typescript-가이드라인)
3. [React 가이드라인](#react-가이드라인)
4. [Jotai (상태 관리)](#jotai-상태-관리)
5. [Emotion (스타일링)](#emotion-스타일링)
6. [파일 구조](#파일-구조)
7. [네이밍 컨벤션](#네이밍-컨벤션)
8. [코드 포매팅](#코드-포매팅)
9. [Import 순서](#import-순서)
10. [에러 처리](#에러-처리)
11. [성능 모범 사례](#성능-모범-사례)
12. [테스팅 가이드라인](#테스팅-가이드라인)
13. [공통 패턴](#공통-패턴)

## 코드 품질 철학

### 원칙

1. **명확성 > 똑똑함** - 이해하기 쉬운 코드 작성
2. **일관성** - 코드베이스 전체에서 확립된 패턴 따르기
3. **타입 안정성** - TypeScript의 타입 시스템을 완전히 활용
4. **단순성** - 복잡한 솔루션보다 단순한 솔루션 선호
5. **유지보수성** - 변경하기 쉬운 코드 작성

### 린팅이 품질을 강제하는 방법

린팅 설정이 자동으로 품질 표준을 강제합니다:

- **TypeScript 타입 검사**: 커밋 전 타입 오류 검출 및 차단
- **ESLint**: 로직 오류를 잡고 코드 패턴 강제
- **Prettier**: 일관된 포매팅 강제
- **Pre-commit hooks**: 잘못된 코드가 커밋되는 것을 방지

이러한 도구들이 함께 작동하여:

- 런타임 전에 타입 오류 및 버그 포착
- 일관된 코드 스타일 유지
- 모범 사례 강제
- 코드 리뷰 마찰 감소

## TypeScript 가이드라인

### 타입 어노테이션

항상 함수 파라미터와 반환 타입에 명시적인 타입 어노테이션을 제공합니다.

**좋음:**

```typescript
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`
}
```

**나쁨:**

```typescript
function calculateTotal(price, quantity) {
  return price * quantity
}

const formatCurrency = amount => {
  return `$${amount.toFixed(2)}`
}
```

### Interface vs Type

객체 형태에는 `interface`를, 유니온, 교차, 또는 원시 타입 별칭에는 `type`을 사용합니다.

**좋음:**

```typescript
// 객체 형태 - interface 사용
interface User {
  id: string
  name: string
  email: string
}

// 유니온 타입 - type 사용
type Status = 'pending' | 'active' | 'inactive'

// 교차 타입 - type 사용
type UserWithTimestamps = User & {
  createdAt: Date
  updatedAt: Date
}
```

### `any` 사용 금지

`any` 타입을 절대 사용하지 마세요. 타입을 정말 모르는 경우 `unknown`을 사용하세요.

**좋음:**

```typescript
function parseJSON(json: string): unknown {
  return JSON.parse(json)
}

const data = parseJSON(jsonString)
if (typeof data === 'object' && data !== null) {
  // 타입 가드 - 이제 data를 안전하게 사용 가능
}
```

**나쁨:**

```typescript
function parseJSON(json: string): any {
  return JSON.parse(json)
}
```

### 옵셔널 체이닝과 Nullish 병합 연산자

안전한 null/undefined 처리를 위해 최신 TypeScript 기능을 사용합니다.

**좋음:**

```typescript
const userName = user?.profile?.name ?? 'Anonymous'
const itemCount = cart?.items?.length ?? 0
```

**나쁨:**

```typescript
const userName = user && user.profile && user.profile.name ? user.profile.name : 'Anonymous'
const itemCount = cart && cart.items ? cart.items.length : 0
```

### Strict Null 체크

`tsconfig.json`에 strict 모드가 활성화되어 있습니다. 항상 null/undefined 케이스를 처리하세요.

**좋음:**

```typescript
function greetUser(user: User | null): string {
  if (!user) {
    return 'Hello, Guest!'
  }
  return `Hello, ${user.name}!`
}
```

## React 가이드라인

### 함수형 컴포넌트

항상 훅과 함께 함수형 컴포넌트를 사용합니다. 클래스 컴포넌트는 허용되지 않습니다.

**좋음:**

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

**나쁨:**

```typescript
class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.label}</button>
  }
}
```

### Props 타입 정의

Props를 인라인 타입이 아닌 인터페이스로 정의합니다.

**좋음:**

```typescript
interface UserCardProps {
  user: User
  onEdit: (userId: string) => void
  showActions?: boolean
}

export function UserCard({ user, onEdit, showActions = true }: UserCardProps) {
  // 컴포넌트 구현
}
```

**나쁨:**

```typescript
export function UserCard({
  user,
  onEdit,
  showActions = true,
}: {
  user: User
  onEdit: (userId: string) => void
  showActions?: boolean
}) {
  // 컴포넌트 구현
}
```

### 훅 규칙

훅의 규칙을 엄격히 따릅니다 (ESLint로 강제됨).

**좋음:**

```typescript
function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    setLoading(true)
    const data = await fetchUser()
    setUser(data)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user found</div>

  return <div>{user.name}</div>
}
```

**나쁨:**

```typescript
function UserProfile() {
  const [user, setUser] = useState<User | null>(null)

  // 잘못됨: 조건부로 훅 호출
  if (user === null) {
    const [loading, setLoading] = useState(false)
  }

  return <div>{user?.name}</div>
}
```

### 커스텀 훅

재사용 가능한 로직을 커스텀 훅으로 추출합니다.

**좋음:**

```typescript
// hooks/useUser.ts
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true)
        const data = await fetchUser(userId)
        setUser(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [userId])

  return { user, loading, error }
}

// 컴포넌트에서 사용
function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>No user found</div>

  return <div>{user.name}</div>
}
```

### 이벤트 핸들러

이벤트 핸들러에는 `handle` 접두사가 붙은 설명적인 이름을 사용합니다.

**좋음:**

```typescript
function LoginForm() {
  const [email, setEmail] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 제출 로직
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={handleEmailChange} />
    </form>
  )
}
```

### 이벤트 핸들러의 비동기 작업

떠다니는 프로미스에 `void` 연산자를 사용합니다 (ESLint로 강제됨).

**좋음:**

```typescript
function SaveButton() {
  const handleSave = async () => {
    await saveData()
    showNotification('Saved!')
  }

  return <button onClick={() => void handleSave()}>Save</button>
}
```

**나쁨:**

```typescript
function SaveButton() {
  const handleSave = async () => {
    await saveData()
  }

  // 이것은 린팅 오류를 발생시킵니다 - 떠다니는 프로미스
  return <button onClick={handleSave}>Save</button>
}
```

### Server / Client 컴포넌트 (Next.js App Router)

- **Server Component**(기본): `app/` 내 컴포넌트는 기본적으로 서버에서만 렌더링됩니다. `async` 함수로 만들 수 있고, DB/API를 직접 호출해도 됩니다.
- **Client Component**: `'use client'`를 파일 최상단에 넣으면 브라우저에서 실행됩니다. `useState`, `useEffect`, 이벤트 핸들러, 브라우저 API를 쓸 때 사용합니다.

```typescript
// app/dashboard/page.tsx (Server Component, 기본)
export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/data')
  const json = await data.json()
  return <Dashboard data={json} />
}

// components/Counter.tsx (Client Component)
'use client'
import { useState } from 'react'
export function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}
```

### 컴포넌트 크기

컴포넌트를 작고 집중적으로 유지합니다. 컴포넌트가 200줄을 초과하면 분할을 고려하세요.

**좋음:**

```typescript
// UserProfile.tsx
export function UserProfile({ userId }: UserProfileProps) {
  const { user, loading } = useUser(userId)

  if (loading) return <UserProfileSkeleton />

  return (
    <div>
      <UserHeader user={user} />
      <UserDetails user={user} />
      <UserActions user={user} />
    </div>
  )
}
```

## Jotai (상태 관리)

전역/공유 상태는 **Jotai**로 관리합니다. atom 단위로 상태를 나누고, 필요한 컴포넌트에서만 구독합니다.

### Atom 정의 위치

- **공통 atom**: `src/atoms/` 또는 `src/stores/` 디렉토리에 도메인/기능별로 분리
- **페이지/기능 전용 atom**: 해당 feature 폴더 내 `atoms.ts` 또는 `atoms/` 폴더

**좋음:**

```typescript
// src/atoms/auth.ts
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
export const isAuthenticatedAtom = atom(get => get(userAtom) !== null)
```

### Atom 네이밍

- atom 변수: camelCase + `Atom` 접미사 (예: `userAtom`, `cartItemsAtom`)
- 파생(derived) atom은 의미가 드러나는 이름 사용 (예: `isAuthenticatedAtom`, `totalCountAtom`)

### Primitive vs Derived

- **원시 상태**: `atom(initialValue)` 사용
- **파생 상태**: `atom(get => ...)` 사용해 불필요한 중복 상태 방지

**좋음:**

```typescript
const itemsAtom = atom<CartItem[]>([])
const totalCountAtom = atom(get => {
  const items = get(itemsAtom)
  return items.reduce((sum, item) => sum + item.quantity, 0)
})
```

### 쓰기 가능한 atom

set이 필요한 경우 `atom(null, (get, set, update) => { ... })` 또는 `atomWithReducer` 등 활용. 비동기/사이드이펙트는 `jotai/utils`의 `atomWithQuery`, `atomWithMutation` 등 검토.

### Provider

App Router 사용 시 `layout.tsx` 또는 필요한 구간에 `<Provider>`로 감쌉니다. Next.js와 함께 사용할 때는 서버/클라이언트 경계를 고려해 Provider는 Client Component에서만 사용합니다.

```typescript
// app/layout.tsx 또는 providers.tsx
'use client'
import { Provider as JotaiProvider } from 'jotai'

export function Providers({ children }: { children: React.ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>
}
```

## Emotion (스타일링)

스타일링은 **Emotion** (`@emotion/react`, `@emotion/styled`)을 사용합니다. CSS-in-JS로 컴포넌트 단위 스타일을 관리합니다.

### 스타일 작성 방식

- **컴포넌트 단위 스타일**: `css` prop 또는 `styled` 컴포넌트 사용
- **글로벌 스타일**: `Global` 컴포넌트 또는 `layout.tsx`에서 한 곳에 정의

**css prop (권장):**

```typescript
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const wrapper = css`
  display: flex;
  gap: 8px;
  padding: 16px;
`

export function Card({ children }: { children: React.ReactNode }) {
  return <div css={wrapper}>{children}</div>
}
```

**styled 컴포넌트:**

```typescript
import styled from '@emotion/styled'

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export function Button(props: React.ComponentProps<typeof StyledButton>) {
  return <StyledButton {...props} />
}
```

### 테마/토큰

색상, 간격, 폰트 등은 theme으로 한 곳에 정의하고 `useTheme()` 또는 theme props로 사용합니다.

```typescript
// theme.ts
export const theme = {
  colors: { primary: '#0066cc', background: '#fff' },
  spacing: { sm: 4, md: 8, lg: 16 },
}

// 사용
const header = css`
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md}px;
`
```

(ThemeProvider는 App 레이아웃에서 한 번만 감싸서 사용합니다.)

### 동적 스타일

props에 따라 스타일이 바뀌는 경우, `css` 안에서 조건부 표현 또는 함수로 처리합니다.

```typescript
const button = (props: { variant: 'primary' | 'secondary' }) => css`
  background: ${props.variant === 'primary' ? '#0066cc' : '#eee'};
  color: ${props.variant === 'primary' ? '#fff' : '#333'};
`
```

### 파일 구조와의 통합

- 컴포넌트 전용 스타일은 해당 컴포넌트 파일 내부 또는 같은 폴더의 `*.styles.ts`에 정의
- Emotion 사용 시 `ComponentName.css` 대신 `css`/`styled` 사용. 필요 시 `ComponentName.styles.ts`로 스타일 객체만 분리

## 파일 구조

### 디렉토리 구조 (Feature-Sliced Design - FSD)

이 프로젝트는 확장성과 유지보수성을 위해 **Feature-Sliced Design (FSD)** 아키텍처 패턴을 따릅니다. FSD는 애플리케이션을 도메인과 계층(레이어)으로 분할하여, 각 부분이 독립적으로 개발되고 재사용될 수 있도록 돕습니다. Next.js App Router의 `app/` 디렉토리 구조와 결합하여 사용합니다.

**FSD 핵심 레이어:**

*   **`app`**: 애플리케이션의 시작점, 전역 설정, 라우팅 정의 (Next.js `app/` 디렉토리).
*   **`pages`**: 페이지 단위의 컴포넌트 (Next.js `app/` 내의 라우트별 `page.tsx`).
*   **`widgets`**: 여러 기능(features)이나 엔티티(entities)를 조합하여 복잡한 UI 블록을 구성합니다 (예: 헤더, 푸터, 댓글 목록 위젯).
*   **`features`**: 사용자 시나리오(use case)와 관련된 로직과 UI (예: 로그인 폼, 게시물 작성 기능).
*   **`entities`**: 핵심 비즈니스 객체 및 관련 로직/UI (예: User, Product, Comment).
*   **`shared`**: 범용적으로 사용되는 UI 컴포넌트, 유틸리티, 타입, API 클라이언트 등 (레이어 간 재사용).

**예시 디렉토리 구조:**

```
src/
├── app/                    # Next.js App Router (루트 라우팅, 레이아웃, 에러/로딩 페이지 등)
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 루트 페이지 (/)
│   ├── api/                # API 라우트 핸들러 (선택 사항)
│   └── (auth)/             # 라우트 그룹 (예: 로그인, 회원가입 페이지)
│       └── login/
│           └── page.tsx
├── entities/               # 핵심 도메인 엔티티 (예: user, post, product)
│   ├── user/
│   │   ├── model/          # Jotai atom, 비즈니스 로직
│   │   ├── ui/             # 관련 UI 컴포넌트 (예: UserAvatar, UserProfileCard)
│   │   └── index.ts        # 엔티티 공개 인터페이스
│   └── post/
│       ├── model/
│       ├── ui/
│       └── index.ts
├── features/               # 사용자 시나리오 (예: auth/login, post/create)
│   ├── auth/
│   │   ├── login-form/     # 로그인 폼 기능
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── post/
│   │   ├── create-post/
│   │   └── index.ts
├── widgets/                # 복합 UI 블록 (예: header, footer, sidebar)
│   ├── header/
│   │   ├── ui/
│   │   └── index.ts
│   └── post-list/          # 게시물 목록 위젯
│       ├── ui/
│       ├── model/
│       └── index.ts
├── pages/                  # 페이지 수준의 컴포넌트 (Next.js app/ 레이어와 연동)
│   ├── home/
│   │   ├── ui/             # 페이지 컴포넌트
│   │   └── index.ts
│   └── user-profile/
│       ├── ui/
│       └── index.ts
├── shared/                 # 공통으로 사용되는 것들
│   ├── ui/                 # 원자 컴포넌트 (Button, Input 등)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   ├── lib/                # 유틸리티 함수, API 클라이언트 (formatters, validators, api.ts)
│   ├── config/             # 상수, 환경 설정
│   ├── types/              # 전역 타입 정의
│   └── assets/             # 이미지, 아이콘 등
```

### 컴포넌트 파일 구조

FSD 패턴 내에서 각 슬라이스(`entities`, `features`, `widgets`, `shared/ui`)의 컴포넌트는 자체 디렉토리를 가져야 합니다. 이 디렉토리는 슬라이스 내부의 `ui` 폴더에 위치합니다.

```
ComponentName/
├── ComponentName.tsx      # 컴포넌트 구현
├── ComponentName.test.tsx # 컴포넌트 테스트
├── ComponentName.styles.ts # Emotion 스타일 (필요 시)
├── types.ts              # 컴포넌트 전용 타입 (해당 컴포넌트 내부에서만 사용되는 경우)
└── index.ts              # 재내보내기

**index.ts:**

```typescript
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './types'
```

## 네이밍 컨벤션

### 파일 및 디렉토리

- **컴포넌트**: PascalCase (예: `UserProfile.tsx`, `NavigationBar.tsx`)
- **훅**: camelCase에 `use` 접두사 (예: `useAuth.ts`, `useLocalStorage.ts`)
- **유틸리티**: camelCase (예: `formatDate.ts`, `validateEmail.ts`)
- **타입**: camelCase (예: `user.ts`, `apiResponse.ts`)
- **상수**: camelCase 파일, UPPER_SNAKE_CASE 내보내기 (예: `config.ts` → `export const API_BASE_URL`)

### 변수 및 함수

- **변수**: camelCase (예: `userName`, `isLoading`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_RETRIES`, `API_TIMEOUT`)
- **함수**: camelCase (예: `fetchUser`, `calculateTotal`)
- **React 컴포넌트**: PascalCase (예: `UserCard`, `LoginForm`)
- **훅**: camelCase에 `use` 접두사 (예: `useUser`, `useTheme`)
- **이벤트 핸들러**: camelCase에 `handle` 접두사 (예: `handleClick`, `handleSubmit`)

### 타입 및 인터페이스

- **인터페이스**: PascalCase (예: `User`, `ApiResponse`)
- **타입 별칭**: PascalCase (예: `Status`, `UserRole`)
- **Props 인터페이스**: PascalCase에 `Props` 접미사 (예: `ButtonProps`, `UserCardProps`)
- **제네릭 타입**: 대문자 한 글자 또는 설명적인 PascalCase (예: `T`, `TData`, `TResponse`)

**좋음:**

```typescript
interface User {
  id: string
  name: string
}

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

type Status = 'active' | 'inactive'

const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = () => {
    onSelect(user)
  }

  return <div onClick={handleClick}>{user.name}</div>
}
```

## 코드 포매팅

Prettier 설정이 다음을 강제합니다:

### 따옴표 및 세미콜론

- **따옴표**: 문자열에 싱글 쿼트 사용
- **세미콜론**: 세미콜론 사용 안 함
- **JSX 따옴표**: 더블 쿼트

```typescript
const message = 'Hello, World!'
const element = <div className="container">Content</div>

function greet(name: string) {
  return `Hello, ${name}`
}
```

### 들여쓰기 및 줄 길이

- **들여쓰기**: 2 스페이스
- **줄 길이**: 최대 100자
- **후행 쉼표**: ES5 스타일 (배열과 객체에서)

```typescript
const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
}

const numbers = [1, 2, 3, 4, 5]
```

### 화살표 함수

- 화살표 함수 파라미터 주위에 괄호를 항상 사용 (강제: `arrowParens: 'avoid'`)
- 가능한 경우 암시적 반환 사용

```typescript
// 단일 파라미터 - 괄호 없음 (Prettier 설정: avoid)
const double = n => n * 2

// 다중 파라미터 또는 파라미터 없음 - 괄호 사용
const add = (a, b) => a + b
const getRandomNumber = () => Math.random()

// 간단한 표현식의 암시적 반환
const getName = user => user.name

// 복잡한 로직의 명시적 반환
const processUser = user => {
  const formatted = formatUser(user)
  return formatted
}
```

## Import 순서

다음 순서로 import를 정리합니다 (스타일 가이드로 강제됨):

1. React 및 Next.js
2. 외부 라이브러리
3. 내부 컴포넌트
4. 내부 훅
5. 내부 유틸리티·서비스
6. 타입
7. 스타일

**좋음:**

```typescript
// 1. React 및 Next.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 2. 외부 라이브러리
import { useQuery } from '@tanstack/react-query'

// 3. 내부 컴포넌트
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

// 4. 내부 훅
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'

// 5. 내부 유틸리티·서비스
import { formatDate } from '@/utils/formatters'
import { validateEmail } from '@/utils/validators'

// 6. 타입
import type { User, UserRole } from '@/types/user'

// 7. 스타일 (Emotion은 보통 같은 파일 내 css/styled 사용)
import { wrapper } from './UserProfile.styles'
```

### Named vs Default Export

리팩토링 및 IDE 지원을 위해 default export보다 named export를 선호합니다.

**좋음:**

```typescript
// Button.tsx
export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

// Import
import { Button } from '@/components/Button'
```

**Next.js App Router:** `app/` 내의 `page.tsx`, `layout.tsx`는 Next.js 규약상 default export를 사용합니다.

```typescript
// app/page.tsx
export default function HomePage() {
  return <div>Home</div>
}

// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

## 에러 처리

### Try-Catch 블록

특히 비동기 작업에서 항상 에러를 적절히 처리합니다.

**좋음:**

```typescript
async function loadUser(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = (await response.json()) as User
    return data
  } catch (error) {
    console.error('Failed to load user:', error)
    // 사용자에게 에러 표시
    showNotification('Failed to load user', 'error')
    return null
  }
}
```

### 에러 바운더리

컴포넌트 에러 처리를 위해 React 에러 바운더리를 사용합니다.

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }

    return this.props.children
  }
}
```

### 타입 안전 에러 처리

더 나은 에러 처리를 위해 타입이 지정된 에러 클래스를 생성합니다.

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    console.error(`API Error [${error.code}]:`, error.message)
  } else if (error instanceof Error) {
    console.error('Error:', error.message)
  } else {
    console.error('Unknown error:', error)
  }
}
```

## 성능 모범 사례

### 메모이제이션

불필요한 재렌더링을 방지하기 위해 `useMemo`와 `useCallback`을 신중하게 사용합니다.

**좋음:**

```typescript
function UserList({ users, onSelect }: UserListProps) {
  // 비용이 많이 드는 계산 메모이제이션
  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name))
  }, [users])

  // 자식 컴포넌트에 전달되는 콜백 메모이제이션
  const handleUserSelect = useCallback(
    (userId: string) => {
      onSelect(userId)
    },
    [onSelect]
  )

  return (
    <ul>
      {sortedUsers.map(user => (
        <UserItem key={user.id} user={user} onSelect={handleUserSelect} />
      ))}
    </ul>
  )
}
```

**과도한 사용 금지:**

```typescript
// 나쁨 - 불필요한 메모이제이션
function Counter() {
  const [count, setCount] = useState(0)

  // 이것은 과도함 - 연산이 사소함
  const doubled = useMemo(() => count * 2, [count])

  return <div>{doubled}</div>
}
```

### 리스트 렌더링

리스트를 렌더링할 때 항상 안정적인 키를 제공합니다.

**좋음:**

```typescript
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}
```

**나쁨:**

```typescript
{users.map((user, index) => (
  <UserCard key={index} user={user} />
))}
```

### 코드 스플리팅

Next.js는 App Router 기반으로 라우트별 자동 코드 스플리팅을 합니다. 무거운 클라이언트 컴포넌트만 동적 import로 지연 로딩합니다.

```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false, // 클라이언트 전용일 때
})

export default function DashboardPage() {
  return (
    <div>
      <HeavyChart />
    </div>
  )
}
```

## 테스팅 가이드라인

이 프로젝트에서는 E2E 테스트에 **Playwright**(`@playwright/test`)를 사용합니다. 단위/컴포넌트 테스트는 현재 의무화되지 않았지만, 도입 시 아래 패턴을 참고합니다.

### 테스트 파일 위치

테스트하는 코드 옆에 `.test.tsx` 또는 `.spec.tsx` 접미사를 붙여 테스트 파일을 배치합니다.

```
Button/
├── Button.tsx
├── Button.test.tsx
└── index.ts
```

### 테스트 구조

Arrange-Act-Assert 패턴을 사용합니다.

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('calls onClick handler when clicked', () => {
    // Arrange (준비)
    const handleClick = jest.fn()
    render(<Button label="Click me" onClick={handleClick} />)

    // Act (실행)
    const button = screen.getByRole('button', { name: 'Click me' })
    fireEvent.click(button)

    // Assert (검증)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    // Arrange (준비)
    render(<Button label="Click me" onClick={() => {}} disabled />)

    // Act (실행)
    const button = screen.getByRole('button', { name: 'Click me' })

    // Assert (검증)
    expect(button).toBeDisabled()
  })
})
```

## 공통 패턴

### 로딩 상태

```typescript
function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  if (!user) {
    return <EmptyState message="User not found" />
  }

  return <UserDetails user={user} />
}
```

### 폼 처리

폼 데이터 유효성 검사에는 **Zod** 라이브러리를 사용하여 강력한 타입 안정성과 런타임 검증을 제공합니다. Zod 스키마는 폼 데이터의 형태와 타입을 정의하며, 이를 통해 입력 데이터의 유효성을 쉽게 검사하고 TypeScript 타입을 추론할 수 있습니다.

**Zod 스키마 정의 예시:**

```typescript
// entities/auth/model/schemas.ts (예시 경로, FSD 구조 반영)
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
})

// Zod 스키마로부터 TypeScript 타입 추론
export type LoginFormData = z.infer<typeof loginSchema>
```

**폼 처리 시 Zod 스키마 활용 예시:**

```typescript
// features/auth/login-form/ui/LoginForm.tsx (예시 경로, FSD 구조 반영)
import { useState } from 'react'
import { z } from 'zod' // Zod 임포트
import { loginSchema, type LoginFormData } from '@/entities/auth/model/schemas' // 정의된 스키마 임포트
// 실제 환경에서는 Input, Button 컴포넌트 경로도 FSD에 맞게 조정 필요

function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  // 에러 상태는 Zod 스키마의 키와 동일하게 설정 (Record<keyof ..., string> 사용)
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // 사용자가 입력을 시작하면 해당 필드의 에러 지우기
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Zod를 이용한 유효성 검사
      loginSchema.parse(formData)
      // 유효성 검사 통과 시 제출 로직
      // await login(formData) // 실제 로그인 API 호출
      console.log('폼 제출:', formData)
      setErrors({}) // 모든 에러 초기화
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod 에러 처리: 각 필드에 대한 에러 메시지 추출
        const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
        for (const issue of error.errors) {
          if (issue.path.length > 0 && typeof issue.path[0] === 'string') {
            fieldErrors[issue.path[0] as keyof LoginFormData] = issue.message
          }
        }
        setErrors(fieldErrors)
      } else {
        // 기타 에러 처리 (예: API 호출 실패)
        console.error('로그인 실패:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="Email"
      />
      <Input
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        placeholder="Password"
      />
      <Button type="submit" label="Login" />
    </form>
  )
}
```

### API 호출 및 데이터 페칭

Next.js에서는 `fetch`(또는 axios), App Router의 Server Component에서의 직접 fetch, 또는 클라이언트에서 React Query 등을 사용합니다.

**타입을 지정한 API 호출:**

```typescript
// 타입 정의
interface UserResponse {
  id: string
  name: string
  email: string
}

async function fetchUser(userId: string): Promise<UserResponse | null> {
  try {
    const res = await fetch(`/api/users/${userId}`)
    if (!res.ok) return null
    const data = (await res.json()) as UserResponse
    return data
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}

// React Query 사용 예 (클라이언트 컴포넌트)
function UserGreeting({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  if (isLoading) return <div>로딩 중...</div>
  if (error || !user) return <div>사용자를 불러올 수 없습니다.</div>

  return <p>안녕하세요, {user.name}님.</p>
}
```

**네비게이션:** 페이지 이동은 `next/link`와 `useRouter`를 사용합니다.

```typescript
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 선언적 이동
<Link href="/dashboard">대시보드</Link>

// 프로그래매틱 이동
const router = useRouter()
router.push('/login')
```

## 린팅 통합

이러한 모든 가이드라인은 린팅 설정으로 강제됩니다:

- **TypeScript 타입 검사**: 타입 안정성 보장 및 타입 오류 검출
- **ESLint**: 코드 품질 문제 및 React 모범 사례 검사
- **Prettier**: 코드를 자동으로 포맷
- **Pre-commit hooks**: Git commit 시 타입 검사, 린트, 포매팅을 자동 수행하여 위반 사항이 커밋되는 것을 방지

### 수동 검사

이러한 가이드라인에 대해 코드를 확인하려면:

```bash
# 모든 검사 실행
yarn type-check && yarn lint && yarn format:check

# 문제 자동 수정
yarn lint:fix && yarn format
```

### Git Commit Hook

Git commit 시 lint-staged로 다음이 자동 수행됩니다:

1. **ESLint 자동 수정** (`eslint --fix`): 스테이징된 `.ts`, `.tsx` 파일에 대한 코드 품질 자동 수정
2. **Prettier 포매팅** (`prettier --write`): 일관된 코드 스타일 적용

커밋 전에 타입 오류가 없는지 확인하려면 `yarn type-check`를 수동으로 실행하세요.

## 도구 설정 (Tooling Setup)

이 프로젝트는 다음과 같은 주요 도구들을 사용하여 개발 표준과 효율성을 유지합니다. 각 도구는 `package.json`의 스크립트나 설정 파일을 통해 구성됩니다.

*   **TypeScript**: 정적 타입 검사를 통해 개발 초기 단계에서 오류를 방지하고 코드의 안정성을 높입니다. (`yarn type-check`)
*   **ESLint**: 코드 품질을 유지하고 일관된 코드 스타일을 강제하며, FSD 아키텍처 규칙과 같은 모범 사례를 적용합니다. (`yarn lint`, `yarn lint:fix`)
*   **Prettier**: 코드 포맷팅을 자동으로 처리하여 팀 전체의 코드 스타일 일관성을 보장합니다. (`yarn format`, `yarn format:check`)
*   **Jotai**: 경량의 원자 단위 상태 관리 라이브러리로, 전역 상태를 효율적으로 관리합니다.
*   **Emotion**: CSS-in-JS 라이브러리로, 컴포넌트 단위의 스타일링을 제공하여 유지보수성을 높입니다.
*   **Zod**: 스키마 기반의 런타임 유효성 검사 라이브러리로, 폼 데이터 및 API 응답의 타입 안정성과 유효성 검사를 강화합니다.
*   **Playwright**: End-to-End (E2E) 테스트를 위한 프레임워크로, 실제 사용자 시나리오에 기반한 테스트 자동화를 지원합니다.
*   **Husky & lint-staged**: Git 커밋 전 자동으로 린트 및 포맷팅을 실행하여 잘못된 코드가 커밋되는 것을 방지합니다. (`prepare` 스크립트 및 `lint-staged` 설정)

## 질문이나 제안 사항이 있나요?

이러한 가이드라인에 대한 질문이나 개선 제안이 있는 경우:

1. 팀과 논의를 열기
2. Pull Request를 통해 변경 제안
3. 팀 합의로 이 문서 업데이트

기억하세요: 이러한 가이드라인은 우리가 함께 더 나은 코드를 작성하는 데 도움이 됩니다. 이는 우리의 필요에 따라 진화해야 하는 살아있는 문서입니다.
