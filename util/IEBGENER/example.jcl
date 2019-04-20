//EXAMPLE JOB (#ACCT),'DESCRIPTION',MSGCLASS=A,CLASS=A,
//      MSGLEVEL=(1,1),REGION=0M,NOTIFY=&SYSUID.,SYSAFF=*
//* ********************************************************************
//* * SO THIS JOB WILL TAKE DATA FROM SEQ TO PDS 
//* ********************************************************************
//* *  
//STEP1    EXEC PGM=IEBGENER                                
//SYSPRINT DD SYSOUT=*                                      
//SYSUT1   DD DSN=A028356.EU2015.STATS,DISP=SHR            
//SYSUT2   DD DSN=A028356.IEBGEN.EUSTATSR,DISP=(NEW,CATLG), 
//         DCB=*.SYSUT1,SPACE=(TRK,(1,1,10)),DSNTYPE=LIBRARY
//SYSIN    DD *                                             
 GENERATE MAXNAME=3,MAXGPS=2 
 MEMBER NAME=LABEL
 RECORD IDENT=(4,'Rank',1)
 MEMBER NAME=TOP10
 RECORD IDENT=(2,'10',1)
 MEMBER NAME=OTHER40
/*