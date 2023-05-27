import { TextField, Box, Button, Typography, TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RetrievedPassage( {passageObj} ) {

    const [ color, setColor ] = useState("dodgerBlue");
    const [ repeatedWords, setRepeatedWords ] = useState([]);

    const wordsToExclude = ["the", "is", "are", "was", "were", "to", "me", "in", "of", "a", "and"];

    const contrastWords = ["but ", "despite"];
    const reasons = ["because", "for "];
    const conjunctions = ["for ", " and ", "nor ", "but ", " or ", "yet", " so "];
    const conditions = [" if", "unless"];

    const boldText = ({ children, highlightIndex }) => (
        <strong className="highlighted-text">{children}</strong>
    );

    const italicizeText = ({ children, highlightIndex }) => (
        <em className="highlighted-text">{children}</em>
    );

    const colorText = ({ children, highlightIndex }) => (
        <Typography component="span" sx={{bgcolor:`${color}`, color:"white"}} variant="subtitle1">{children}</Typography>
    )

    const [ searchWords, setSearchWords ] = useState([]);

    const generateFrequency = (passage) => {
        const wordSet = new Set();
        const wordArr = passage.text.replaceAll("\n", " ").replaceAll("? ", " ").replaceAll(". ", " ").replaceAll(", ", " ").split(" ");
        const wordCount = [];
        wordArr.forEach(word => {
            wordSet.add(word.toLowerCase());
        });
        wordSet.forEach((word)=> {
            wordCount.push(
                {
                    word: word,
                    count: wordArr.filter((val)=> (val.toLowerCase() === word)).length
                }
            )
        })
        setRepeatedWords(wordCount.sort((word1, word2)=> {return -(word1.count - word2.count)}));
    }

    useEffect(()=> {
        generateFrequency(passageObj);
    }, [])

    return (
        <Box sx={{border: "1px solid black", borderRadius: 3, p:5, m:3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: "300px", maxWidth: "600px" }}> 
            <Box sx={{ lineHeight: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}> 
                <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={searchWords}
                    autoEscape={true}
                    highlightTag={colorText}
                    textToHighlight={passageObj.text}
                    />
                {passageObj.reference}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                <Box sx={{ marginX: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <TextField sx={{ marginY: 1 }} label="Search words" size="small" onChange={(event)=>setSearchWords(event.target.value.split(","))}></TextField>
                    <TextField sx={{ marginY: 1 }} label="Color" size="small" onChange={(event)=>setColor(event.target.value)}></TextField>
                </Box>
                <Box sx={{ marginX: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <FormControl>
                        <FormLabel>Highlight</FormLabel>
                        <RadioGroup
                            defaultValue="female"
                        >
                            <FormControlLabel value="Reasons" control={<Radio size="small"/>} onChange={()=>setSearchWords(reasons)} label="Reasons" />
                            <FormControlLabel value="Contrasts" control={<Radio size="small"/>} onChange={()=>setSearchWords(contrastWords)} label="Contrasts" />
                            <FormControlLabel value="Conjunctions" control={<Radio size="small"/>} onChange={()=>setSearchWords(conjunctions)} label="Conjunctions" />
                            <FormControlLabel value="Conditions" control={<Radio size="small"/>} onChange={()=>setSearchWords(conditions)} label="Conditional Clause" />
                            {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
            
            {/* <TableContainer sx={{ width: "400px" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Repeated Words</strong></TableCell>
                            <TableCell align="center"><strong>Count</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repeatedWords.filter((word)=> (!wordsToExclude.includes(word.word))).slice(0, 20).map((word, key)=> {
                            return (
                                <TableRow>
                                    <TableCell align="center">{word.count}</TableCell>
                                    <TableCell align="center">{word.word}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer> */}
            
        </Box>
    )
}

export default RetrievedPassage;