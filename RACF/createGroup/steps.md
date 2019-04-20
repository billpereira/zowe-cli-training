Summary of steps for defining a RACF group

Prepare to create the group profile as follows:
    Decide which group is to be the superior group.
    Decide the group name. (This cannot be the same as a user ID.)
    Decide who (a user or RACF group) is to be the owner of the new group. (If the group owner is a user, give him or her the information needed to manage the group.)
    Decide if the group should be a universal group.
    If your installation is using RACF to protect terminals, and the users in this group are terminal users who are to be limited to specific terminals, consider specifying the NOTERMUACC operand on the ADDGROUP command.
    If DFSMSdss is in use, work with the storage administrator to set the initial values in the group's DFP segment.

Create the group profile using the ADDGROUP command.
    For example, to create a group for Department A called DEPTA whose owner and superior group is to be a group called ALLDEPT, enter:
    ADDGROUP DEPTA OWNER(ALLDEPT) SUPGROUP(ALLDEPT)

Connect appropriate users to the new group.
    Most users should have USE group authority.
    A few users might need a group authority higher than USE group authority (such as CONNECT).
    For example, to connect department members SUE, LIZ, and GENE to the DEPTA group and also give LIZ and SUE authority to add new users to the group, enter:
    CONNECT (SUE LIZ) GROUP(DEPTA) OWNER(DEPTA) AUTHORITY(CONNECT)

CONNECT GENE GROUP(DEPTA) OWNER(DEPTA)
    These commands assign ownership of each connection to group DEPTA rather than to the issuer of the CONNECT command (the default). Because GENE's authority defaults to USE, GENE can use any of the resources (for example, data sets) that belong to group DEPTA.

If the group is to own group data sets, do the following:
    Create a top generic profile for the group data sets in the DATASET class. For example:
    ADDSD 'DEPTA.**' UACC(NONE)
    If appropriate, assign the GRPACC user attribute to a member of the group. (However, before assigning the GRPACC user attribute, see Table 1.)

If the group requires access to RACF-protected resources, give the group the required access using the PERMIT command. For example:
    PERMIT 'RACF.PROTECT.DATA' ID(DEPTA) ACCESS(READ)

If the group requires access to z/OS UNIX resources, alter the profile to include an OMVS segment with an z/OS UNIX group identifier (GID). For example:
    ALTGROUP DEPTA OMVS(GID(100))