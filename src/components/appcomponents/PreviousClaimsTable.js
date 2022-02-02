import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import firebase from '../config/firebase.js';
// import { Box, Container, Typography } from '@mui/material';
// import { useHistory, useParams } from 'react-router-dom';
// import TablePagination from "@material-ui/core/TablePagination";

export default function PreviousClaimsTable() {
//   const db = firebase.firestore();
//   const history = useHistory();
//   const [page, setPage] = React.useState(0);
//   const [userData, fetchuserData] = useState({
//     data: [],
//   });
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
 
//   const [userNum, fetchuserNum] = useState(0);

//   const fetchuserData1 = async () => {
//     let isMounted = true
//     const userRef = await db.collection("users");
//     userRef.onSnapshot((doc) => {
//       fetchuserNum(doc.size);
//     })
//     isMounted = false
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const fetchData = async () => {
//     let isMounted = true
//     const userRef = await db.collection("users");
//     userRef.onSnapshot((doc) => {
//       let rawData = [];
//       doc.forEach((req) => {
//         rawData.push(req.data());
//       });
//       fetchuserData({ data: rawData });
//     })
//     isMounted = false
//   };

//   useEffect(() => {
//     fetchData();
//     fetchuserData1();
//   }, [userData]);

  return (
      <div>table</div>
    // <Container >
    //   <Box>
    //     <Typography variant="h5" sx={{ padding: "20px 0px" }}>Registered Users</Typography>
    //     <TableContainer component={Paper}>
    //       <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    //         <TableHead>
    //           <TableRow sx={{ paddding: 10 }}>
    //             <TableCell sx={{ padding: 2 }}>Name</TableCell>
    //             <TableCell align="right" sx={{ padding: 2 }}>E-mail</TableCell>
    //             <TableCell align="right" sx={{ padding: 2 }}>Gender</TableCell>
    //             <TableCell align="right" sx={{ padding: 2 }}>Location</TableCell>
    //             <TableCell align="right" sx={{ padding: 2 }}>Phone Number</TableCell>
    //             <TableCell align="right" sx={{ padding: 2 }}>Coins</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {
    //             userData.data
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //             .map((data) => {
    //               return (
    //                 <TableRow
    //                   hover
    //                   key={data.uid}
    //                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                   onClick={() => history.push(`/u/${data.uid}/view`)}
    //                 >
    //                   <TableCell component="th" scope="row" sx={{ padding: 2 }}>
    //                     {data.fullname}
    //                   </TableCell>
    //                   <TableCell align="right" sx={{ padding: 2 }}>{data.email}</TableCell>
    //                   <TableCell align="right" sx={{ padding: 2 }}>{data.gender}</TableCell>
    //                   <TableCell align="right" sx={{ padding: 2 }}>{data.location}</TableCell>
    //                   <TableCell align="right" sx={{ padding: 2 }}>{data.phoneNumber}</TableCell>
    //                   <TableCell align="right" sx={{ padding: 2 }}>{data.coins}</TableCell>
    //                 </TableRow>
    //               )
    //             })
    //           }
    //         </TableBody>
    //       </Table>


          

    //     </TableContainer>
    //     < TablePagination
    //         rowsPerPageOptions={[5, 10, 25]}
    //         component="div"
    //         count={userNum}  //data.length
    //         rowsPerPage={rowsPerPage}
    //         page={page}
    //         onChangePage={handleChangePage}
    //         onChangeRowsPerPage={handleChangeRowsPerPage}
    //       />
    //   </Box>
    // </Container>

  );
}