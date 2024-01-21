import { MENU_CARD_IMG_URL } from "../utils/constants";
const MenuCard =(res) =>{
    console.log(res)
    const {name,price,imageId,defaultPrice} = res?.items?.card?.info;
return (
    <div>
        <div className="menu-card-container"> 
        <div className="dishName-price">
        <p>{name}</p>
        <p>{"Rs. "} {price / 100 || defaultPrice/100}</p>
        </div>
        <div className="dish-image-add">
            <img src={MENU_CARD_IMG_URL+imageId}></img>
        </div>
        
        </div>
        <hr></hr>
        
    </div>
)


}
export default MenuCard;