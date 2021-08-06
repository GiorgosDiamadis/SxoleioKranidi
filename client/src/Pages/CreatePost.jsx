import Navbar from "../Components/Navbar";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { postRequest } from "../RequestController";

export default function CreatePost() {
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [postData, setPostData] = useState({ title: "", body: "" });

  const handleOnClick = () => {
    setIsLoading(true);

    postRequest("posts/create", { ...postData })
      .then((response) => {
        setIsLoading(false);
      })
      .catch((res) => {
        setIsLoading(false);
        setErrors(res.response.data.errors);
        console.log(res.response);
      });
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  return (
    <div>
      <Navbar />
      <div
        className="p-d-flex p-flex-row p-jc-center p-ai-center"
        style={{ height: "100vh" }}
      >
        <Toast ref={toast} position={"top-center"} />
        <Card title="Νέα Ανακοίνωση" id="newPost">
          <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
            <div className="p-inputgroup p-mb-2 ">
              <span className="p-float-label">
                <InputText
                  id="title"
                  tooltip="Εισάγετε τον τίτλο της δημοσίευσης"
                  tooltipOptions={{ position: "top" }}
                  aria-describedby="title-help"
                  onChange={(e) => {
                    setPostData((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }));
                  }}
                />
                <label htmlFor="title">Τίτλος</label>
              </span>
            </div>
            <div className="p-inputgroup">
              <Editor
                // headerTemplate={header}
                style={{ width: "800px" }}
                value={postData.body}
                onTextChange={(e) => {
                  setPostData((prevState) => ({
                    ...prevState,
                    body: e.htmlValue,
                  }));
                }}
              />
            </div>

            <Button
              label="Δημιουργία"
              loading={isLoading}
              className="p-mt-6"
              onClick={handleOnClick}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
