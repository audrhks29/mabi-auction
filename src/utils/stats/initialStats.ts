type Stats_ap_rpType = {
  ap: number;
  hp: number;
  mp: number;
  sp: number;
  str: number;
  dex: number;
  int: number;
  will: number;
  luck: number;
  rp: RpTypes[] | null;
};

export const initial_stats_ap_rp: Stats_ap_rpType = {
  ap: 0,
  hp: 0,
  mp: 0,
  sp: 0,
  str: 0,
  dex: 0,
  int: 0,
  will: 0,
  luck: 0,
  rp: null,
};
