import { useState, type SyntheticEvent } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import outputs from "../amplify_outputs.json";
import Markdown from "react-markdown";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: [formData.get("ingredients")?.toString() || ""],
      });

      console.log("Response data:", data);
      console.log("Response errors:", errors);

      if (!errors && data) {
        if (data.error) {
          setResult(`Error: ${data.error}`);
        } else if (data.body) {
          setResult(data.body);
        } else {
          setResult("No data returned from Bedrock. Check console for details.");
        }
      } else {
        const errorMessage = errors ? JSON.stringify(errors, null, 2) : "Unknown error";
        setResult(`GraphQL Error: ${errorMessage}`);
        console.error("GraphQL errors:", errors);
      }
    } catch (e) {
      console.error("Exception:", e);
      setResult(`Exception occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal
          <br />
          <span className="highlight">Recipe AI</span>
        </h1>
        <p className="description">
          Simply type a few ingredients using the format ingredient1,
          ingredient2, etc., and Recipe AI will generate an all-new recipe on
          demand...
        </p>
      </div>

      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder="Ingredient1, Ingredient2, Ingredient3,...etc"
          />
          <button type="submit" className="search-button">
            Generate
          </button>
        </div>
      </form>

      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          result && (
            <div className="result">
              <Markdown>{result}</Markdown>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
