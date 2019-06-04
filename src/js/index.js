// Global App Controller
import SearchModel from './models/SearchModel';

/**
 * Global App State
 * State is stored in localStorage
 * - Search Object
 * - Current Object
 * - Shopping List Object
 * - Liked Object
 */


const res = new SearchModel().getAlbums("Dunedin");
res.then(r => console.log("Result => ", r.data.city));
