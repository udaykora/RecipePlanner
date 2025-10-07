import { createSlice } from "@reduxjs/toolkit";

let toggleBackground = createSlice({
  name: "togglebg",
  initialState: { color: "theme-light" },
  reducers: {
    addbg: (state) => {
      state.color = state.color === "theme-dark" ? "theme-light" : "theme-dark";
    }
  }
});

export default toggleBackground.reducer;
export let { addbg } = toggleBackground.actions;
