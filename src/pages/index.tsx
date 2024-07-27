// pages/index.tsx
import { useState, FormEvent, useRef } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAutosizeTextArea from "@/components/hooks/useAutosizeTextArea";

export default function Homepage() {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [data, setData] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, data);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios({
        url,
        method,
        data: data ? JSON.parse(data) : undefined,
      });
      setResponse(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponse(error.message);
      } else {
        setResponse("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="px-32 pt-6 relative">
      <Button
        onClick={scrollToTop}
        className="fixed bottom-0 right-0 m-6 rounded-full px-4 py-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-up"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
          />
        </svg>
      </Button>
      <p className="text-6xl font-bold">API TESTER</p>
      <form onSubmit={handleSubmit} className="w-full py-6">
        <div className="flex items-center gap-2">
          <div className="w-full">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://pokeapi.co/api/v2/pokemon/"
              className="py-6 px-4"
            />
          </div>
          <div>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-24 py-6">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button className="py-6 px-8" type="submit">
              SEND
            </Button>
          </div>
        </div>

        <div className="pt-6">
          <span className="flex justify-between">
            <p className="pb-2 font-bold text-lg">JSON</p>
            <p
              onClick={() => setData("")}
              className="pb-2  text-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </p>
          </span>
          <Textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            ref={textAreaRef}
            className="overflow-hidden min-h-96"
            placeholder='{"Key" : "value"}'
          />
        </div>
      </form>
      {response && (
        <div>
          <span className="flex justify-between">
            <p className="pb-2 font-bold text-lg">Response</p>
            <p
              onClick={() => setResponse(null)}
              className="pb-2  text-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </p>
          </span>
          <div className="border-2 px-12 py-6 rounded-sm mb-12">
            <div>
              <pre className="text-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
