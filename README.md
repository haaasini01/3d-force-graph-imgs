# 3D Force Graph Visualization

A lightweight Vite-powered demo that renders a 3D force-directed graph using `3d-force-graph` and `three.js`.

The application loads graph data from a JSON file and maps node IDs to image textures, then displays an interactive 3D network in the browser.

---
## Demo

A short walkthrough of the interactive 3D force-directed graph visualization:

**Video Demo:**  
https://drive.google.com/file/d/1CnhLauD9iWcS5xIiKMMmq0nhBw7TXMRF/view?usp=sharing

> The demo showcases:
> - Rendering of the 3D force-directed graph  
> - Image-textured nodes representing CIFAR-10 samples  
> - Emergent clustering behavior in the layout  
> - Interactive exploration (zoom, rotate, node click navigation)

---

## Graph Construction & Data Processing

To construct meaningful relationships between images, the graph is built using **feature-based similarity** rather than raw pixel comparisons.

### Semantic Feature Extraction

- **Feature Representation:** Each image is converted into a compact feature vector capturing its visual characteristics.
- **Implementation (Notebook):**
  - CIFAR-10 images are loaded using `torchvision.datasets`
  - Images are transformed into tensors
  - Each image is flattened into a 1D vector representation
- **Similarity Metric:** Pairwise similarity between images is computed using **cosine similarity**.
- **Graph Formation:** Each node is connected to its nearest neighbors based on similarity scores.

**Outcome:**  
Images belonging to the same class form tight clusters, while dissimilar classes remain separated in the graph.

---

### Data Processing Pipeline (Notebook)

The graph generation pipeline was implemented in a Jupyter Notebook and includes:

- **Dataset Loading:** CIFAR-10 dataset downloaded and accessed programmatically  
- **Subset Creation:**  
  - Random sampling of **300 images**  
  - Ensuring **30 images per class** for balance  
- **Feature Preparation:**  
  - Conversion to tensors  
  - Flattening into feature vectors  
- **Similarity Computation:**  
  - Pairwise cosine similarity matrix computed  
- **Graph Construction:**  
  - Edges created by selecting nearest neighbors  
- **Export:**  
  - Final graph saved as `graph.json` for visualization  

---

### Data Augmentation

Basic augmentations are applied during preprocessing to improve robustness:

- **Random Flips & Crops:** Reduce positional bias  
- **Color Variations:** Reduce sensitivity to lighting and color differences  

**Impact:**  
Improves consistency of similarity relationships and reduces incorrect connections.

---

### Dataset: CIFAR-10 Subset

A balanced subset of CIFAR-10 is used to keep the graph interpretable:

- **Total Images:** 300  
- **Class Distribution:** 30 images per class (10 classes)  
- **Sampling Strategy:** Stratified selection to ensure uniform representation  

**Result:**  
Balanced clusters emerge clearly in the 3D force-directed layout.

---

## Features

- 3D force-directed graph rendering
- Textured nodes using image assets
- Interactive camera controls: zoom, rotate, and pan
- Click a node to open its source image in a new tab
- Configurable graph and image paths via `config.js`

---

## Tech Stack

- JavaScript (ES Modules)
- Vite
- `3d-force-graph`
- `three.js`
- HTML/CSS

---

## Project Structure

```text
3d-force-graph/
├── config.js          # Graph and image path constants
├── index.html         # Main HTML page
├── package.json       # Project scripts and dependencies
├── public/
│   ├── graphs/        # Graph JSON files
│   ├── cifar-subset/  # Image assets for nodes
│   └── cifar-subset-1/
└── src/
    ├── main.js       # Graph initialization and node rendering
    └── style.css     # Optional app styling
```

---

## How It Works

- `src/main.js` fetches the JSON graph from `GRAPH_PATH`.
- Each node is rendered as a `THREE.PlaneGeometry` mesh with a texture loaded from `IMAGE_PATH`.
- Node clicks open the corresponding image in a new browser tab.

---




## Setup

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Customization

- Change the graph source in `config.js` by updating `GRAPH_PATH`.
- Change the node image directory by updating `IMAGE_PATH`.
- Add or replace graph JSON files inside `public/graphs/`.
- Add or replace node images inside `public/cifar-subset-1/`.

---

## Notes

- The current `index.html` uses a full-window `#graph` container and imports `src/main.js` as a module.
- `style.css` is present for app styling but the main graph canvas styling is defined inline in `index.html`.
