import UseEffectHook from "./hooks/useEffectHook";
import UseStateHook from "./hooks/useStateHook";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      {/* <UseStateHook /> */}
      <UseEffectHook />
    </div>
  );
}
