import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import { Box, Typography, Paper} from '@mui/material'
import Faq from "react-faq-component";
import data from '../appcomponents/data';
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";

export default function Faqs() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    React.useEffect(() => {
      const node = loadCSS(
        "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
        // Inject before JSS
        document.querySelector("#font-awesome-css") || document.head.firstChild
      );
      return () => {
        node.parentNode.removeChild(node);
      };
    }, []);
  
  return (
    <Box>
       <Typography className="headerStyle">
        <Icon
          baseClassName="fas"
          className="fas fa-question-circle"
          sx={{
            fontSize: { xs: 30, md: 50 },
            color: "primary",
            width: 300,
            marginTop: 2,
          }}
        />
      </Typography>
      <Typography variant="h5" className="headerStyle">
        FAQ's
      </Typography>
      <Paper sx={{ marginTop: "5px", padding: "10px", marginLeft: "10px", marginRight:"10px", marginBottom:"60px"}}>
      <Faq
        data={data}
        styles={{
          bgColor: "primary",
          rowTitleColor: "text",
          rowTitleTextSize: "large",
          rowContentColor: "text",
          rowContentTextSize: "15px",
          rowContentPaddingTop: "10px",
          rowContentPaddingBottom: "10px",
          rowContentPaddingLeft: "50px",
          rowContentPaddingRight: "3px",
          arrowColor: "#80b2bd"
        }}
        config={{
          animate: true
        }}
      />
      </Paper>
    </Box>
  );
}
