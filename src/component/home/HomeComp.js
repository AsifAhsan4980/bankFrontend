import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useState} from "react";
import {
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Autocomplete} from "@mui/lab";
import districts from "../../assets/json/BDdistrictList.json"
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import postBlog from "../../api/submitInfo";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


const HomeComp = () => {

    const districtList = districts.districts

    const { register, handleSubmit } = useForm();

    const [value, setValue] = useState('1');
    const [exist, setExist] = useState(false)
    const [existMessage, setExistMessage] = useState(false)
    const [nid, setNid] = useState(true)
    const [tax, setTax] = useState(true)
    const [district, setDistrict] = useState('')
    const [distSelect, setDistSelect] = useState(true)
    const [incSelect, setIncSelect] = useState(true)
    const [income, setIncome] = useState(null)
    const [dob, setDob] = useState(null)
    const [gDob, setGDob] = useState(true)

    const [res, setRes] = useState({})

    console.log(dob)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleExistChange = (event) => {
        event.target.value === "true" ? (setExistMessage(true)) : setExistMessage(false)
        event.target.value === "true" ? (setExist(false)) : setExist(true)
    }

    const handleChangeNid = (event) => {
        console.log(event.target.value)
        event.target.value === "true" ? (setNid(true)) : setNid(false)
        event.target.value === "true" ? (setValue("2")) : (setValue("1"))
    }

    function handleChangeTax(event) {
        event.target.value === "true" ? (setTax(true)) : setTax(false)
        event.target.value === "true" ? (setValue("3")) : (setValue("2"))
    }

    function setI(value) {
        setIncome(value.target.value)
        setIncSelect(false)
        console.log(value.target.value)
    }

    const onSubmit = data => {
        let submitData = {
            ...data,
            district : district,
            income : income,
            dob: dob
        }
        postBlog(submitData).then(r=> {
            console.log(r.data)
            setRes(r.data)
            setValue("7")
        })
        console.log(submitData)
    };

    const radioGroup = () => {
        return (
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Do you have a valid Southeast Bank Credit
                    Card?</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleExistChange}
                >
                    <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
                    <FormControlLabel value="false" control={<Radio/>} label="No"/>
                </RadioGroup>
                {existMessage && (
                    <Typography color="error">
                        We are sorry for the inconvenience. But more than one credit card is not allowed.
                    </Typography>
                )}
            </FormControl>
        )
    }




    const allowed = () => {
        return (
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList sx={{display: "none"}} onChange={() => handleChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1"/>
                            <Tab label="Item Two" value="2"/>
                            <Tab label="Item Three" value="3"/>
                            <Tab label="Item Four" value="4"/>
                            <Tab label="Item Five" value="5"/>
                            <Tab label="Item Six" value="6"/>
                            <Tab label="Item Seven" value="7"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">{stepOne()}</TabPanel>
                    <TabPanel value="2">{stepTwo()}</TabPanel>
                    <TabPanel value="3">{stepThree()}</TabPanel>
                    <TabPanel value="4">{stepFour()}</TabPanel>
                    <TabPanel value="5">{stepFive()}</TabPanel>
                    <TabPanel value="6">{stepSix()}</TabPanel>
                    <TabPanel value="7">{stepSeven()}</TabPanel>
                </TabContext>
            </Box>
        )
    }

    const stepOne = () => {
        return (
            <>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"> Do you have a valid National ID
                        Number? </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChangeNid}
                    >
                        <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
                        <FormControlLabel value="false" control={<Radio/>} label="No"/>
                    </RadioGroup>
                    {!nid && (
                        <Typography color="error">
                            We are sorry for the inconvenience. Please apply after you have acquired your National ID.
                        </Typography>
                    )}
                </FormControl>
            </>
        )
    }


    const stepTwo = () => {
        return (
            <>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"> Do you have a valid Tax Identification
                        Number? </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChangeTax}
                    >
                        <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
                        <FormControlLabel value="false" control={<Radio/>} label="No"/>
                    </RadioGroup>
                    {!tax && (
                        <Typography color="error">
                            We are sorry for the inconvenience. Please apply after you have acquired your Tax Identification Number.
                        </Typography>
                    )}
                </FormControl>
            </>
        )
    }


    const stepThree = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item sx={{mr: 2}} md={6} sm={12} xs={12}>
                        <Typography>Please Select the district where you live</Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={districtList}
                            onChange={(event, newValue) => {
                                setDistrict(newValue.label)
                                setDistSelect(false)
                            }}
                            renderInput={(params) => <TextField  {...params} label="District"/>}
                        />
                    </Grid>
                </Grid>
                <Button sx={{mt: 2}} disabled={distSelect} variant="outlined"
                        onClick={() => setValue("4")}>Proceed</Button>
            </>
        )
    }


    const stepFour = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item sx={{mr: 2}} md={6} sm={12} xs={12}>
                        <Typography>Your gross fixed monthly income in BDT</Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField id="outlined-basic" type={"number"} variant="outlined" onChange={setI}/>
                    </Grid>
                </Grid>
                <Button sx={{mt: 2}} disabled={incSelect} variant="outlined"
                        onClick={() => setValue("5")}>Proceed</Button>
            </>
        )
    }

    const stepFive = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item sx={{mr: 2}} md={6} sm={12} xs={12}>
                        <Typography>Please enter Date of birth (mm/dd/yyyy)</Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            inputFormat="dd/MM/yyyy"
                            sx={{width: 220}}
                            onChange={(e) => {
                                setDob(e.target.value)
                                setGDob(false)
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                        {/*    <Stack spacing={3}>*/}
                        {/*        <MobileDatePicker*/}
                        {/*            label="Date mobile"*/}
                        {/*            inputFormat="MM/dd/yyyy"*/}
                        {/*            value={value}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            renderInput={(params) => <TextField {...params} />}*/}
                        {/*        />*/}
                        {/*    </Stack>*/}
                        {/*</LocalizationProvider>*/}
                    </Grid>
                </Grid>
                <Button sx={{mt: 2}} disabled={gDob} variant="outlined" onClick={() => setValue("6")}>Proceed</Button>
            </>
        )
    }

    function stepSix() {
        return (
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid sx={{mt: 2}} container>
                        <Grid item sm={4} xs={12}>
                            <Typography>
                                Full Name
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField {...register("fullName")} size={'small'}/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 2}} container>
                        <Grid item sm={4} xs={12}>
                            <Typography>
                                Employer
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField {...register("empolyer")} size={'small'}/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 2}} container>
                        <Grid item sm={4} xs={12}>
                            <Typography>
                                Email
                            </Typography>
                        </Grid>
                        <Grid  item sm={8} xs={12}>
                            <TextField {...register("email")} size={'small'}/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 2}} container>
                        <Grid item sm={4} xs={12}>
                            <Typography>
                                Phone
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField {...register("phoneNumber")} size={'small'}/>
                        </Grid>
                    </Grid>
                    <Button sx={{mt: 2}}  variant="outlined" type={"submit"} >Submit</Button>
                    <Button sx={{mt: 2, ml:2}}  variant="outlined"  onClick={() => {
                        setExist(false)
                        setValue("1")
                    }}>Refresh</Button>

                </form>
            </Container>

        )
    }

    const stepSeven = () => {
        return (
            <Box sx={{textAlign: "center"}}>
                <Typography color={"success"} variant="h4">
                    Application Successful!
                </Typography>
                <Paper sx={{m:2, p:2, backgroundColor: 'whiteSmoke'}} elevation={2}>
                    <Box>
                        <Typography>
                            Thank You {res.fullName}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            Your application is successful
                        </Typography>

                    </Box>
                    <Box >
                        <Typography sx={{mt:2, mb:2}} variant="h5">
                            Application tracing ID : {res._id}
                        </Typography>

                    </Box>
                    <Box>
                        <Typography>
                            Please keep this for future reference
                        </Typography>

                    </Box>
                </Paper>
                <Button sx={{mt: 2, ml:2}}  variant="outlined"  onClick={() => {
                    setExist(false)
                    setValue("1")
                }}>Refresh</Button>
            </Box>
        )
    }


    return (
        <Container>
            <Paper elevation={4} sx={{m: 2, p: 2}}>
                {!exist ? radioGroup() : allowed()}
            </Paper>

        </Container>

    );
}

export default HomeComp