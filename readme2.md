auth workfloe->

client ----> request to a route --> validate token and attach user
obect in req by jwt auth guard ---> roles guard check if the role is correct and matched with required role--> id yes allowto controller