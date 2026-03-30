# Idea Spark 💡

> **A Modern Web Application for Capturing, Organizing, and Managing Ideas**

A responsive, user-friendly application built with cutting-edge frontend technologies to help you brainstorm, organize, and retrieve ideas efficiently.

## ✨ Features

- **Real-Time Capture**: Quickly jot down ideas as they come to mind
- **Smart Organization**: Categorize ideas with custom tags and labels
- **Powerful Search**: Find any idea instantly with intelligent full-text search
- **Cloud Sync**: Automatic synchronization across devices
- **Export Options**: Download ideas in multiple formats (PDF, JSON, CSV)
- **Dark Mode**: Eye-friendly dark theme support
- **Responsive Design**: Perfect on desktop, tablet, and mobile

---

## 🛠 Tech Stack

### Frontend
```
├── Vue 3          - Progressive JavaScript framework
├── TypeScript     - Type-safe JavaScript
├── Vite           - Next-generation build tool
├── Pinia          - State management
├── Vue Router     - Client-side routing
└── Tailwind CSS   - Utility-first CSS framework
```

### Additional Libraries
- **axios** - HTTP client for API calls
- **date-fns** - Date formatting
- **highlight.js** - Code syntax highlighting
- **marked** - Markdown support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm 6+ or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/VerneZhong/idea-spark.git
cd idea-spark

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
idea-spark/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── IdeaForm.vue    # Create/edit idea form
│   │   ├── IdeaCard.vue    # Idea card display
│   │   └── SearchBar.vue   # Search component
│   ├── views/               # Page-level components
│   │   ├── HomeView.vue
│   │   ├── IdeaDetailView.vue
│   │   └── SettingsView.vue
│   ├── stores/              # Pinia state management
│   │   ├── ideaStore.ts
│   │   └── userStore.ts
│   ├── composables/         # Reusable logic
│   │   ├── useIdeas.ts
│   │   └── useLocalStorage.ts
│   ├── services/            # API services
│   │   └── api.ts
│   ├── styles/              # Global styles
│   ├── App.vue
│   └── main.ts
├── public/                  # Static assets
├── index.html              # Entry HTML
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
└── README.md
```

---

## 💡 Key Features Explained

### 1. Real-Time Synchronization

```typescript
// Auto-save every 5 seconds
const autoSave = () => {
  setInterval(async () => {
    if (hasUnsavedChanges.value) {
      await saveIdea();
      hasUnsavedChanges.value = false;
    }
  }, 5000);
};
```

### 2. Smart Search

```typescript
// Fuzzy search implementation
const searchIdeas = (query: string) => {
  return ideas.value.filter(idea => 
    idea.title.toLowerCase().includes(query.toLowerCase()) ||
    idea.content.toLowerCase().includes(query.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};
```

### 3. Category Management

```typescript
interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  ideaCount: number;
}

interface Idea {
  id: string;
  title: string;
  content: string;
  category: Category;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 Component Example

### IdeaCard Component

```vue
<template>
  <div class="idea-card" :style="{ borderLeft: `4px solid ${idea.category.color}` }">
    <div class="idea-header">
      <h3>{{ idea.title }}</h3>
      <span class="category-badge">{{ idea.category.name }}</span>
    </div>
    
    <div class="idea-content">
      {{ idea.content }}
    </div>
    
    <div class="idea-tags">
      <span v-for="tag in idea.tags" :key="tag" class="tag">
        #{{ tag }}
      </span>
    </div>
    
    <div class="idea-footer">
      <span class="timestamp">{{ formatDate(idea.createdAt) }}</span>
      <div class="actions">
        <button @click="editIdea">Edit</button>
        <button @click="deleteIdea">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { formatDate } from '@/utils/dateUtils';

const props = defineProps<{
  idea: Idea;
}>();

const emit = defineEmits<{
  edit: [idea: Idea];
  delete: [id: string];
}>();

const editIdea = () => emit('edit', props.idea);
const deleteIdea = () => emit('delete', props.idea.id);
</script>
```

---

## 🔧 Configuration

### Vite Configuration

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

---

## 📱 Responsive Design

```css
/* Mobile First Approach */
@media (max-width: 640px) {
  .idea-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .idea-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .idea-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# E2E testing
npm run test:e2e
```

---

## 🚀 Performance Optimizations

### 1. Code Splitting
```typescript
const routes = [
  {
    path: '/',
    component: () => import('./views/HomeView.vue')
  }
];
```

### 2. Lazy Loading Components
```typescript
const IdeaDetail = defineAsyncComponent(() =>
  import('./components/IdeaDetail.vue')
);
```

### 3. Virtual Scrolling for Large Lists
```vue
<virtual-list
  :items="ideas"
  :item-height="200"
  :buffer="5"
>
  <template #default="{ item }">
    <IdeaCard :idea="item" />
  </template>
</virtual-list>
```

---

## 🌐 API Integration

### Example: Fetching Ideas

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
});

export const ideasAPI = {
  getAll: () => apiClient.get('/ideas'),
  getById: (id: string) => apiClient.get(`/ideas/${id}`),
  create: (idea: Idea) => apiClient.post('/ideas', idea),
  update: (id: string, idea: Idea) => apiClient.put(`/ideas/${id}`, idea),
  delete: (id: string) => apiClient.delete(`/ideas/${id}`),
};
```

---

## 🎓 Learning Highlights

### Vue 3 Composition API
- ✅ `<script setup>` syntax
- ✅ Reactive state management
- ✅ Composable functions
- ✅ Lifecycle hooks

### TypeScript Integration
- ✅ Fully typed components
- ✅ Type-safe props and emits
- ✅ Interface definitions
- ✅ Generic types

### Modern Build Tooling
- ✅ Vite's lightning-fast development
- ✅ ES modules support
- ✅ HMR (Hot Module Replacement)
- ✅ Optimized production builds

---

## 💻 Interview Value

This project demonstrates:
1. **Modern Frontend Frameworks** - Vue 3, TypeScript
2. **Component Architecture** - Reusable, testable components
3. **State Management** - Pinia for centralized state
4. **Responsive Design** - Mobile-first approach
5. **Performance Optimization** - Code splitting, lazy loading
6. **Full-Stack Awareness** - API integration patterns
7. **Best Practices** - Clean code, typing, testing

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - See LICENSE file

---

## 🔗 Related Projects

- **[backend-parent](https://github.com/VerneZhong/backend-parent)** - Backend for Idea Spark
- **[thinking-in-spring](https://github.com/VerneZhong/thinking-in-spring)** - Spring Framework deep dive

---

**Author**: Verne Zhong  
**Last Updated**: 2024  
**Built with ❤️ using Vue 3 + TypeScript**
