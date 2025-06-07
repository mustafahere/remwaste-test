# Skip Selection Component

A modern, responsive React component for selecting skip sizes with pricing and features.

## Features

### User Interface

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive layout (mobile, tablet, desktop)
- ⚡ Interactive card-based interface
- 🔄 Smooth transitions and hover effects
- 💫 Loading skeletons for better UX
- 🎯 Clear visual feedback for selections

### Technical Features

- 🛠 Built with React + TypeScript
- 🎨 Styled with Tailwind CSS
- 🔄 Data fetching with React Query
- 📱 Mobile-first responsive design
- 🎭 Framer Motion for animations
- 🏗 Component-based architecture

## Implementation Details

### Component Structure

```tsx
src / components / SkipSelector.tsx; // Main component
FeatureBadge.tsx; // Reusable feature indicator
SkipCardSkeleton.tsx; // Skeleton loader for skip cards
```

### Key Components

#### SkipSelector

The main component that handles:

- Data fetching and state management
- Skip card rendering
- Selection logic
- Responsive layout
- Loading and error states

#### FeatureBadge

A reusable component for displaying feature states:

- Handles both active and inactive states
- Dynamic icons and colors
- Consistent styling across features

#### SkipCardSkeleton

A skeleton loader for skip cards.

### State Management

```typescript
interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
```

### UI/UX Features

1. **Skip Cards**

   - Clear visual hierarchy
   - Feature indicators
   - Price breakdown
   - Selection state
   - Hover and tap animations

2. **Feature Indicators**

   - Road Legal Status
     - Green for allowed
     - Red for not allowed
   - Heavy Waste Status
     - Blue for allowed
     - Yellow for restricted

3. **Price Display**

   - Base price
   - VAT calculation
   - Total price
   - Currency formatting

4. **Mobile Optimization**

   - Compact bottom bar
   - Touch-friendly buttons
   - Responsive grid layout
   - Optimized spacing

5. **Loading States**
   - Skeleton loaders
   - Smooth transitions
   - Maintains layout structure
   - Reduces content shift

### Responsive Design

The component uses a mobile-first approach with three main breakpoints:

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (two columns)
- Desktop: > 1024px (three columns)

### Performance Considerations

1. **Data Fetching**

   - React Query for caching
   - Loading states
   - Error handling
   - Optimistic updates

2. **Animations**

   - Hardware-accelerated transforms
   - Efficient re-renders
   - Smooth transitions

3. **Asset Loading**
   - Optimized images
   - Lazy loading
   - Proper sizing

### Accessibility

- Clear focus states
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

## Dependencies

- React
- TypeScript
- Tailwind CSS
- React Query
- Framer Motion
- Heroicons

## Best Practices

1. **Code Organization**

   - Component-based architecture
   - TypeScript for type safety
   - Reusable components
   - Clear naming conventions

2. **Styling**

   - Tailwind utility classes
   - Consistent spacing
   - Responsive design
   - Theme variables

3. **State Management**

   - React Query for server state
   - Local state for UI
   - TypeScript interfaces
   - Proper error handling

4. **Performance**
   - Optimized renders
   - Proper caching
   - Efficient animations
   - Code splitting
