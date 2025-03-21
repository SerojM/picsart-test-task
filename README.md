# 📷 Optimized Masonry Grid SPA with Photo Details – Technical Assignment

This is a high-performance single-page application (SPA) built with React and TypeScript as part of a technical assignment. It features a fully responsive, virtualized masonry grid layout for displaying photos from the Pexels API and includes a photo detail view with smooth navigation and UI performance optimizations.

---

## 🚀 How to Run and Build the Project

### ✅ Install Dependencies
```bash
npm install
```

### ✅ Start the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

### ✅ Build for Production
```bash
npm run build
```
This will generate an optimized production build in the `dist/` folder.

---

## 🧠 Design Decisions

- **React + TypeScript** were selected for strong typing, scalability, and maintainability.
- The **masonry grid layout** was implemented manually using CSS and dynamic column assignment.
- **No external layout or virtualization libraries** were used to meet assignment constraints.
- The app is a true **Single Page Application (SPA)** using **React Router** for navigation.
- **Local state** is used to keep the app simple and efficient.
- The **search query** is stored in `localStorage` to persist context when navigating.
- The **photo detail view** is rendered based on a selected photo ID from the URL using `useParams`.

---

## ⚡ Performance Optimization Techniques

Performance was a key consideration throughout development. The following techniques were used:

- ✅ **Custom virtualization**: Only visible photos are rendered using efficient logic.
- ✅ **Responsive layout**: The number of columns adapts to the screen width dynamically.
- ✅ **Lazy image loading**: Images are shown only after being fully loaded to reduce layout shift.
- ✅ **Loading placeholders**: Prevents content jumping when images appear.
- ✅ **Memoization with useMemo/useCallback**: Avoids unnecessary recalculations and re-renders.
- ✅ **Styled-components**: CSS-in-JS for isolated, optimized styles.
- ✅ **Lightweight bundles**: No heavy UI frameworks or libraries were used.

---

## 🧪 Testing

Unit tests were implemented using **Vitest** and **React Testing Library** to ensure correctness and component reliability.

### ✅ To Run Tests
```bash
npm run test
```

### ✅ Covered Test Areas
- Rendering of the `PhotoDetails` component
- Handling of loading state
- Fallback behavior when photo is not found
- Navigation via the Back button

---

## 🔐 API Access

This application uses the [Pexels API](https://www.pexels.com/api/) to retrieve photo data.

The API key is included for testing purposes. You can replace it with your own in `src/api/pexels.ts`:
```ts
const API_KEY = "your-api-key-here";
```


## ✅ Summary

- Built from scratch using React and TypeScript
- Responsive, virtualized masonry layout
- SPA navigation with React Router
- Fully optimized rendering and user experience
- Thoroughly unit tested with clear structure
- Lightweight and production-ready

---

**Author**: Seryozha Mkhitaryan  
**License**: MIT

