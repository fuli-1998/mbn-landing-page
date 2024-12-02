import { redirect } from "next/navigation";
import setupLocatorUI from "@locator/runtime";

console.log("Running in", process.env.NODE_ENV, "mode");

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect("/en");
}
