
export const capitalize =(str: string)=>{

   return str.charAt(0).toUpperCase() + str.slice(1);
}

export const topics = {
   'Send To All': 'platformNotification',
   'GDM +ve': "gdm", // Should show a new dropdown, default is Send to All so send gdm
   'GDM -ve': "gdm_ne",
   'Not Tested': 'untested',
   'Guest Users': 'guest'
}

export let gdm_list = {
   'Send To All': "gdm",
   'MNT': 'mnt',
   'Exercise': 'exercise',
   'Metformin': 'metformin',
   'Insulin': 'Insulin'
}

export const DASHBOARD_USER_TYPES = {
   "MEDICAL OFFICERS": 'medical_officer',
   ANMs: 'anm',
   ASHAs: 'asha',
   "DISTRICT LEVEL ADMIN": 'district',
   "STATE LEVEL ADMIN": 'state',
   "BLOCK LEVEL ADMIN": 'block',
   "SUPER ADMIN": 'super',
   "USER (VIEW ONLY)": 'user'
};

