import { useMapEvents } from "react-leaflet";

function ZoomController(props) {

  const mapEvents = useMapEvents({
    zoomend: () => {
      props.setZoomLevel(mapEvents.getZoom());
    },
  });
  return null;
}
export default ZoomController;
