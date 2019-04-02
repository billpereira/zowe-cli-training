//{{job.name}} JOB {{job.account}},'Alloc Example',MSGCLASS=A,CLASS=A,
//             MSGLEVEL=(1,1),REGION=0M
/*JOBPARM SYSAFF=*
//*
//* *******************************************************************
//* HELLO WORLD JCL
//* *******************************************************************
//*
//HELLO    EXEC PGM=IEFBR14
//ALLOCDD  DD DSN={{dsn.hlq}},
//       DISP=(NEW,CATLG), 
//       DCB=(RECFM={{dsn.dcb.recordFormat}},
//         BLKSIZE={{dsn.dcb.blockSize}},
//         LRECL={{dsn.dcb.recordLength}}),      
//       SPACE=(TRK,(1,1,1))
