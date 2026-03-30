# ts-django-lookups

TypeScript type definitions for Django-style query lookups. A zero-runtime, pure-TypeScript package that provides type-safe query building with automatic field validation and nested lookup support.

## Features

- 🎯 **Type-Safe Lookups**: Automatically infer correct lookup types based on field types
- 🔗 **Nested Field Support**: Full support for nested object field lookups
- 🚀 **Zero Runtime**: Pure type definitions, no JavaScript overhead
- 📦 **Lightweight**: 0kb runtime, only TypeScript type information
- 💪 **Strong Type Inference**: Full IDE autocomplete and compile-time validation

## Installation

```bash
npm install ts-django-lookups
```

Or with yarn:

```bash
yarn add ts-django-lookups
```

## Quick Start

```typescript
import type { Query, StringLookups, NumberLookups } from "ts-django-lookups";

// Define your models/interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
}

// Build type-safe queries
const queryExample: Query<User> = {
  name__icontains: "john", // ✅ Valid string lookup
  age__gte: 18, // ✅ Valid number lookup
  active__exact: true, // ✅ Valid boolean lookup
}; 
```

## Available Lookups

### String Lookups
- `exact` - Case-sensitive exact match
- `iexact` - Case-insensitive exact match
- `contains` - Case-sensitive substring match
- `icontains` - Case-insensitive substring match
- `startswith` - Case-sensitive prefix match
- `istartswith` - Case-insensitive prefix match
- `endswith` - Case-sensitive suffix match
- `iendswith` - Case-insensitive suffix match

### Number Lookups
- `exact` - Exact value match
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal

### Boolean Lookups
- `exact` - Boolean value match

## Types

### `Query<T>`
A strongly-typed query object for model `T`. Supports nested lookups with double underscore syntax.

```typescript
type Query<T> = Partial<Record<NestedLookup<T, string>, any>>;
```

### `Lookup<T>`
Infers appropriate lookup operations for a given field type.

```typescript
type Lookup<T> = T extends string
  ? StringLookups
  : T extends number
  ? NumberLookups
  : T extends boolean
  ? BooleanLookups
  : never;
```

### `NestedLookup<T, K>`
Validates nested field paths with lookups (e.g., `user__name__icontains`).

## Examples

### Nested Queries
```typescript
interface Profile {
  bio: string;
  followerCount: number;
}

interface User {
  name: string;
  profile: Profile;
}

const nestedQuery: Query<User> = {
  profile__bio__contains: "developer", // ✅ Validated nested lookup
  profile__followerCount__gt: 1000, // ✅ Works with nested numbers
};
```

### Type Validation
TypeScript will catch invalid lookup combinations at compile time:

```typescript
interface Post {
  title: string;
  published: boolean;
}

// ❌ TypeScript Error: 'title' doesn't support 'gt' lookup
const invalidQuery: Query<Post> = {
  title__gt: "hello", // Type Error!
};

// ✅ Correct
const validQuery: Query<Post> = {
  title__contains: "hello",
  published__exact: true,
};
```

## License

MIT