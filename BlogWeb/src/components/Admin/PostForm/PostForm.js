import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MUIRichTextEditor from 'mui-rte';
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000"
    }
  }
})

const MuiRichTextEditorStyles = {
  overrides: {
    MUIRichTextEditor: {
      root: {
        backgroundColor: "#ebebeb",
      },
      container: {
        display: "flex",
        flexDirection: "column"
      },
      editor: {
        backgroundColor: "#fff",
        padding: "20px",
        height: "400px",
        maxHeight: "400px",
        overflow: "auto",
        borderBottom: "1px solid gray",
        borderLeft: "1px solid gray",
        borderRight: "1px solid gray",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      },
      toolbar: {
        borderTop: "1px solid gray",
        borderLeft: "1px solid gray",
        borderRight: "1px solid gray",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        backgroundColor: "#ebebeb"
      },
      placeHolder: {
        backgroundColor: "#fff",
        borderLeft: "1px solid gray",
        borderRight: "1px solid gray",
        paddingLeft: 20,
        width: "inherit",
      },
      // anchorLink: {
      //   color: "#333333",
      //   textDecoration: "underline"
      // }
    }
  }
}

Object.assign(defaultTheme, MuiRichTextEditorStyles);

function PostForm(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)' : {m:1, width:'70vw'},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="post-title" label="Title" variant="outlined" />
      <ThemeProvider theme={defaultTheme}>
        <MUIRichTextEditor
          label="Start typing..."
        />
      </ThemeProvider>
    </Box>
  )
}

export default PostForm;