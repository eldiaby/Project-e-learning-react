import './slider.css'
import '../../assets/slider images/1.jpg'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
function Slider() {
  return (
    <>




      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://images.peopleimages.com/picture/202212/2738859-fff09a3f76b5811d8085541ec61fee0e-fit_400_400.jpg" alt="First slide"/>
    </div>
    <div className="carousel-item" >
      <img className="d-block w-100" src="http://cdn1.peopleimages.com/picture/1358466-shopping-is-the-best-medicine-fit_400_400.jpg" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://st.depositphotos.com/62628780/59131/i/450/depositphotos_591318664-stock-photo-afraid-get-wet-young-businesswoman.jpg" alt="Third slide" />
    </div>
  </div>
</div>





    </>
  )
}

export default Slider;