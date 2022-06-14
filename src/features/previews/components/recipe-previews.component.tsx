import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AppDispatch } from "../../../app/store";
import { selectPreviewsLoading, selectPreviews, selectPreviewsLoaded, fetchPreviews } from "../previewsSlice";


const RecipePreviewsComponent = () => {
  const dispatch = useAppDispatch();
  const previews = useAppSelector(selectPreviews);
  const loading = useAppSelector(selectPreviewsLoading);
  const loaded = useAppSelector(selectPreviewsLoaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchPreviews()); 
    }
  }, [loaded, dispatch]);

  const link = (slug: string) => {
    return `${slug}`;
  }

  return (
    <div>
      {previews && previews.length > 0 && (
        <div>
          {previews.map((p, i) => (
            <div key={p.id}>
              <Link to={link(p.slug)}>
                <h1>{p.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default RecipePreviewsComponent;