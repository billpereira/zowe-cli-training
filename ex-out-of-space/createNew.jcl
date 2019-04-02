//CRNEW JOB #ACCT,'Create New',MSGCLASS=A,CLASS=A,
//             MSGLEVEL=(1,1),REGION=0M
/*JOBPARM SYSAFF=*
//*
//* *******************************************************************
//* COPY TO NEW
//* *******************************************************************
//*
//COPY    EXEC PGM=IEBCOPY
//SYSPRINT DD SYSOUT=*
//SYSUT1  DD DSN={{datasetname}},
//       DISP=SHR
//SYSUT2  DD DSN={{datasetname}}.NEW,
//       DISP=(NEW,CATLG), 
//       DCB=(RECFM={{recfm}},
//         BLKSIZE={{blksize}},
//         LRECL={{lrecl}}),      
//       SPACE=(CYL,({{SYSPRIMARY}},{{SYSSECONDS}},1)),
//       VOL=SER={{vol}}
//*
//* *******************************************************************
//* COPY TO NEW
//* *******************************************************************
//*
//RENAME EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*  
//SYSIN DD *                                      
    ALTER {{datasetname}} -                    
       NEWNAME({{datasetname}}.BKP)
    ALTER {{datasetname}}.NEW -                    
       NEWNAME({{datasetname}})
/*

