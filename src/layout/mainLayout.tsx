import clsx from "clsx";
import styles from "../styles/MainLayout.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Slide,
} from "@mui/material";
import { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MainLayout = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [imageLink, setImageLink] = useState("");

  const onAddNewRecipe = async () => {
    if (!recipeName || !imageLink) return;

    const data = {
      slug: "tropical-tea",
      image: imageLink,
      recipe: recipeName,
    };

    try {
      await axios.post("http://localhost:3001/recipes", data);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="header d-flex justify-content-between">
        <p
          className={clsx(
            styles.para,
            "text-secondary-emphasis fs-3 fw-bolder align-self-center"
          )}
        >
          Thang&apos;s Kitchen
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-outline-primary add-button align-self-center"
        >
          Add Recipe
        </button>

        <Dialog
          open={isOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setIsOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Add New Recipe</DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col">Recipe Name: </div>
                <div className="col">
                  <Input
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    aria-atomic
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">Image link: </div>
                <div className="col">
                  <Input
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    aria-atomic
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Disagree</Button>
            <Button onClick={onAddNewRecipe}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>

      {children}
    </div>
  );
};

export default MainLayout;
