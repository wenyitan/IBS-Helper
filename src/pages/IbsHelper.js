import { TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import RetrievedPassage from "../components/RetrievedPassage";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function IbsHelper() {

    const [ passage, setPassage ] = useState("");
    const [ inputPassage, setInputPassage ] = useState("");
    const [ isRetrieved, setIsRetrieved ] = useState(false);
    const [ block, setBlock ] = useState(1);

    const getPassage = () => {
        axios.get(`https://bible-api.com/${inputPassage}`)
            .then((response) => {
                // console.log(response.data);
                setIsRetrieved(true);
                let passageFinal = "";
                response.data.verses.forEach((verse)=> {
                    if (verse.verse === 1) {
                        passageFinal +=  verse.chapter + ":" + verse.verse + " " + verse.text.replaceAll("\n", " ");
                    } else {
                        passageFinal += verse.verse + " " + verse.text.replaceAll("\n", " ");
                    }
                })
                response.data.text = passageFinal;
                setPassage(response.data);
                console.log(response.data);
            })
            .catch((err)=> {
                console.log(err);
            })
    }

    const Highlight = ({ children, highlightIndex }) => (
        <strong className="highlighted-text">{children}</strong>
      );

    var arr = Array.from('G'.repeat(block));

    const increment = () => {
        setBlock(block + 1);
    }

    const decrement = () => {
        if (block !== 1) {
            setBlock(block - 1);
        }
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <TextField sx={{marginTop: 2}} size="small" label="Verse reference" onChange={(event)=>setInputPassage(event.target.value)}></TextField>
            <Button sx={{marginTop: 2}} onClick={getPassage} variant="outlined">Analyze</Button>
            <Box sx={{display:"flex", flexDirection: "row"}}>
                <Button sx={{marginTop: 2}} endIcon={<AddIcon/>} onClick={increment} variant="outlined">Add Panel</Button>
                <Button sx={{marginTop: 2}} endIcon={<RemoveIcon/>} onClick={decrement} variant="outlined">Remove Panel</Button>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", flexWrap:"wrap", alignItems: "center", justifyContent: "center"}}>
                {arr.map((val, key)=> {
                    return (
                        isRetrieved && <RetrievedPassage passageObj={passage} />
                    )
                })}
            </Box>
            
        </Box>
    )
}

export default IbsHelper;