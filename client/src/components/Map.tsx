import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@material-ui/core";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const useStyles = makeStyles({
  leafletContainer: {
    height: "380px",
    width: "100%",
    margin: 0,
  },
});

const Map = () => {
  const position: LatLngExpression = [43.5113824, 16.4678809];
  const zoom: number = 17;
  const classes = useStyles();

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      className={classes.leafletContainer}
    >
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors. Tiles courtesy of Humanitarian 
        OpenStreetMap Team"
        url="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <Marker position={position} title={"medClinic"}>
        <Popup>
          <strong>MedClinic</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
