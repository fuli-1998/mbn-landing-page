import { redirect } from "next/navigation";
import setupLocatorUI from "@locator/runtime";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

export default function RootPage() {
  redirect("/en");
}
