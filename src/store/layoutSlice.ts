import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockType, LayoutConfig } from "@/types";

interface LayoutState {
  blocks: BlockType[];
  history: LayoutConfig[];
  currentHistoryIndex: number;
  isDirty: boolean;
}

const initialState: LayoutState = {
  blocks: [],
  history: [{ blocks: [] }],
  currentHistoryIndex: 0,
  isDirty: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<BlockType[]>) => {
      state.blocks = action.payload;
      state.isDirty = true;
    },

    addBlock: (state, action: PayloadAction<BlockType>) => {
      state.blocks.push(action.payload);
      state.isDirty = true;
    },

    removeBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter(
        (block) => block.id !== action.payload
      );
      state.isDirty = true;
    },

    reorderBlocks: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.blocks.splice(fromIndex, 1);
      state.blocks.splice(toIndex, 0, removed);
      state.isDirty = true;
    },

    updateBlock: (
      state,
      action: PayloadAction<{ id: string; data: Record<string, unknown> }>
    ) => {
      const block = state.blocks.find((b) => b.id === action.payload.id);
      if (block) {
        block.data = { ...block.data, ...action.payload.data };
        state.isDirty = true;
      }
    },

    saveToHistory: (state) => {
      const newConfig = { blocks: [...state.blocks] };

      // Remove any history after current index (for redo)
      state.history = state.history.slice(0, state.currentHistoryIndex + 1);

      // Add new state to history
      state.history.push(newConfig);
      state.currentHistoryIndex = state.history.length - 1;

      // Limit history to last 50 states
      if (state.history.length > 50) {
        state.history = state.history.slice(-50);
        state.currentHistoryIndex = state.history.length - 1;
      }
    },

    undo: (state) => {
      if (state.currentHistoryIndex > 0) {
        state.currentHistoryIndex -= 1;
        state.blocks = [...state.history[state.currentHistoryIndex].blocks];
        state.isDirty = true;
      }
    },

    redo: (state) => {
      if (state.currentHistoryIndex < state.history.length - 1) {
        state.currentHistoryIndex += 1;
        state.blocks = [...state.history[state.currentHistoryIndex].blocks];
        state.isDirty = true;
      }
    },

    loadLayout: (state, action: PayloadAction<LayoutConfig>) => {
      state.blocks = action.payload.blocks;
      state.history = [action.payload];
      state.currentHistoryIndex = 0;
      state.isDirty = false;
    },

    markClean: (state) => {
      state.isDirty = false;
    },
  },
});

export const {
  setBlocks,
  addBlock,
  removeBlock,
  reorderBlocks,
  updateBlock,
  saveToHistory,
  undo,
  redo,
  loadLayout,
  markClean,
} = layoutSlice.actions;

export default layoutSlice.reducer;
