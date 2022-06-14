import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { AppDispatch } from "../../../app/store";
import { fetchRecipe, FetchRecipeProps, selectRecipe, selectRecipeLoaded, selectRecipeLoading } from "../recipesSlice";
import { useParams } from 'react-router-dom';

const RecipeComponent = () => {
  const params = useParams();
  const slug: string = params && params.slug ? params.slug : '';
  
  const dispatch = useDispatch<AppDispatch>();
  const recipe = useAppSelector(selectRecipe(slug));
  const loading = useAppSelector(selectRecipeLoading);
  const loaded = useAppSelector(selectRecipeLoaded);

  useEffect(() => {   
      dispatch(fetchRecipe({ slug: slug })); 
    
  }, [dispatch]);

  return (
    <div>
      {recipe && recipe.name && (
        <h1>{recipe.name}</h1>
      )}
      
    </div>
  )
};

export default RecipeComponent;