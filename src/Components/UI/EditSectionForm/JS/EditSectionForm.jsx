import Button from "../../Button/JS/Button";
import React, { useEffect, useState } from "react";
import classes from "../CSS/EditSectionForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../../../Store/store";
import { useParams } from "react-router-dom";

const EditSectionForm = ({ sectionId, id, onClick }) => {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [Items, setItems] = useState("");
  const [Image, setImage] = useState();
  const userId = localStorage.getItem("userId");
  const Inventory = useSelector((state) => state.Inventory);
  const index = Inventory.findIndex((item) => item._id === sectionId);
  const items = Inventory[index].Items;
  console.log(
    sectionId,
    Inventory.findIndex((item) => item._id === sectionId)
  );

  const EditDataHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", Image);
    data.append("upload_preset", "gmcn2mfb");
    // data.append("Name", Name);
    // data.append("sectionId", sectionId);
    // data.append("userId", userId);
    // data.append("Type", Type);
    // data.append("Items", JSON.stringify(items));
    // data.append("Image", Image);
    console.log(items);
    await axios
      .post("https://api.cloudinary.com/v1_1/dcglxmssd/image/upload", data)
      .then(async (res) => {
        if (res.status === 200) {
          let newData = {
            Name: Name,
            sectionId: sectionId,
            userId: userId,
            Type: Type,
            Items: JSON.stringify(items),
            Image: res.data.url,
          };
          await axios
            .post(
              "https://projectbackend-production-088c.up.railway.app/Inventory/EditSectionData",
              JSON.stringify(newData),
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                dispatch(ChatActions.UpdateSection(res.data));
              }
              onClick((prev) => !prev);
            });
        }
      });
  };
  useEffect(() => {
    const getSectionData = async () => {
      await axios
        .post(
          "https://projectbackend-production-088c.up.railway.app/Inventory/GetSectionData",
          JSON.stringify({ userId: userId, sectionId: sectionId }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          setName(res.data[0].Name);
          setType(res.data[0].Type);
          setImage(res.data[0].Image);
        });
    };
    getSectionData();
  }, []);
  return (
    <div className={classes.EditSectionForm}>
      <div className={classes.EditSectionForm_FormContainer}>
        <h3>Edit Section</h3>
        <form>
          <div className={classes.EditSectionForm_ElementContainer}>
            <p>
              Name<span className={classes.EditSectionForm_Impo}>*</span>
            </p>
            <input
              value={Name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="My Food Section"
              className={classes.EditSectionForm_InputElements}
              required
            />
          </div>
          <div className={classes.EditSectionForm_ElementContainer}>
            <p>
              Type<span className={classes.EditSectionForm_Impo}>*</span>
            </p>
            <input
              value={Type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              placeholder="Food"
              className={classes.EditSectionForm_InputElements}
              required
            />
          </div>
          <div className={classes.EditSectionForm_ElementContainer}>
            <p>Image</p>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              className={classes.EditSectionForm_InputElements}
            />
          </div>
          <Button onClick={EditDataHandler} type="submit">
            EDIT
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditSectionForm;
