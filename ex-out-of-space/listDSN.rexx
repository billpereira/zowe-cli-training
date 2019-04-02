/* REXX */

a = LISTDSI({{datasetName}})

SAY "{"
SAY '"datasetname":"'SYSDSNAME'",'
SAY '"vol":"'SYSVOLUME'",'
SAY '"unit":"'SYSUNIT'",'
SAY '"recfm":"'SYSRECFM'",'
SAY '"lrecl":"'SYSLRECL'",'
SAY '"SYSPRIMARY":"'SYSPRIMARY'",'
SAY '"SYSSECONDS":"'SYSSECONDS'",'
SAY '"SYSUNITS":"'SYSUNITS'",'
SAY '"blksize":"'SYSBLKSIZE'"'
SAY "}"

EXIT