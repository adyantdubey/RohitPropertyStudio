/**
 * Approximate locality centres for the dossier mini-map. These are AREA
 * centres, not plot coordinates — the map is always labelled "approximate
 * locality view". Zone centres are the fallback when a locality is unmapped.
 */

const LOCALITIES: Array<[string, number, number]> = [
  ["whitefield", 12.9698, 77.7500],
  ["varthur", 12.9417, 77.7431],
  ["panathur", 12.9345, 77.6970],
  ["sarjapur", 12.8600, 77.7860],
  ["bellandur", 12.9260, 77.6762],
  ["gunjur", 12.9210, 77.7350],
  ["budigere", 13.0710, 77.7360],
  ["hoodi", 12.9920, 77.7160],
  ["kannamangala", 12.9950, 77.7620],
  ["hoskote", 13.0710, 77.7980],
  ["kodathi", 12.8920, 77.7220],
  ["hsr layout", 12.9116, 77.6389],
  ["devanahalli", 13.2437, 77.7080],
  ["shettigere", 13.1950, 77.6740],
  ["bagalur", 13.1330, 77.6660],
  ["bagaluru", 13.1330, 77.6660],
  ["yelahanka", 13.1007, 77.5963],
  ["hebbal", 13.0358, 77.5970],
  ["hennur", 13.0350, 77.6410],
  ["thanisandra", 13.0570, 77.6270],
  ["jakkur", 13.0780, 77.6070],
  ["ivc road", 13.1900, 77.6100],
  ["doddaballapura", 13.2200, 77.5400],
  ["kogilu", 13.0960, 77.6220],
  ["nagavara", 13.0450, 77.6210],
  ["electronic city", 12.8399, 77.6770],
  ["hosur road", 12.8600, 77.6480],
  ["begur", 12.8770, 77.6250],
  ["bannerghatta", 12.8000, 77.5770],
  ["kanakapura", 12.8580, 77.5480],
  ["jp nagar", 12.9063, 77.5857],
  ["anekal", 12.7100, 77.6960],
  ["attibele", 12.7780, 77.7710],
  ["chandapura", 12.8010, 77.7050],
  ["hosa road", 12.8850, 77.6620],
  ["singasandra", 12.8830, 77.6420],
  ["manchenahalli", 12.8200, 77.7000],
  ["kithiganahalli", 12.7900, 77.7000],
  ["hommadevanahalli", 12.8560, 77.6100],
  ["yeshwanthpur", 13.0280, 77.5400],
  ["goruguntepalya", 13.0300, 77.5300],
  ["tumkur road", 13.0600, 77.5000],
  ["rajarajeshwari", 12.9260, 77.5190],
  ["magadi", 12.9560, 77.5170],
  ["nelamangala", 13.0990, 77.3940],
  ["kumbalgodu", 12.8890, 77.4380],
  ["rajajinagar", 12.9910, 77.5520],
  ["lalbagh", 12.9507, 77.5848],
  ["indiranagar", 12.9719, 77.6412],
  ["kaggadasapura", 12.9850, 77.6770],
  ["yemalur", 12.9440, 77.6710],
  ["hope farm", 12.9850, 77.7370],
  ["cheemasandra", 13.0400, 77.7220],
  ["hadosiddapura", 12.8890, 77.7050],
  ["gattahalli", 12.8850, 77.7250],
  ["rachenalli", 13.0620, 77.6350],
  ["belathur", 13.0030, 77.7570],
  ["nallurhalli", 12.9740, 77.7310],
  ["chikkabanahalli", 12.9930, 77.7290],
  ["ramagondanahalli", 12.9620, 77.7360],
  ["soukya", 12.9990, 77.7810],
  ["chikkajala", 13.1610, 77.6210],
  ["hosahalli", 13.1500, 77.6300],
  ["lakshmipura", 13.2300, 77.6900],
  ["manyata", 13.0450, 77.6210],
];

const ZONES: Record<string, [number, number]> = {
  North: [13.10, 77.62],
  East: [12.96, 77.72],
  South: [12.86, 77.64],
  West: [12.99, 77.52],
  Central: [12.97, 77.60],
};

export function localityLatLng(locality: string, zone: string): { lat: number; lng: number; matched: boolean } {
  const l = locality.toLowerCase();
  for (const [key, lat, lng] of LOCALITIES) {
    if (l.includes(key)) return { lat, lng, matched: true };
  }
  const [lat, lng] = ZONES[zone] ?? ZONES.East;
  return { lat, lng, matched: false };
}

/** OpenStreetMap embed URL for a small area view around the point. */
export function osmEmbedUrl(lat: number, lng: number) {
  const d = 0.02;
  const bbox = [lng - d, lat - d, lng + d, lat + d].map((n) => n.toFixed(4)).join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(4)}%2C${lng.toFixed(4)}`;
}

export function osmLink(lat: number, lng: number) {
  return `https://www.openstreetmap.org/?mlat=${lat.toFixed(4)}&mlon=${lng.toFixed(4)}#map=14/${lat.toFixed(4)}/${lng.toFixed(4)}`;
}
