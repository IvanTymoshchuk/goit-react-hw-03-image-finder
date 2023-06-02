import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from 'service/imgApi';

export class App extends Component {
  state = {
    textQuery: '',
    images: [],
    page: 1,
    loading: false, // spiner
    showModal: false,
    error: null,
    totalPage: null,
  };

  async componentDidUpdate(_, prevState) {
    let { page } = this.state;
    const prevSearchValue = prevState.textQuery;
    const nextSearchValue = this.state.textQuery;

    // Перевіряємо, чи змінились пропси запиту або state сторінки (page)
    if (prevSearchValue !== nextSearchValue || prevState.page !== page) {
      // запуск спінера
      this.setState({ loading: true });

      //  запит на бекенд
      try {
        const response = await imgApi(nextSearchValue, page);
        const { hits, totalHits } = response.data;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalPage: totalHits,
        }));
      } catch (error) {
        this.setState({ error: 'Something wrong. Please try again.' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  //  запит пошуку в App з Searchbar
  handleSubmit = searchValue => {
    this.setState({
      textQuery: searchValue,
      page: 1,
      images: [],
      loading: false,
      showModal: false,
      error: null,
      totalPage: null,
    });
  };

  // кнопка завантаження наступних фото
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  //модалка відкрити
  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

  //модалка закрити
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, showModal, imgUrl, tag, loading, totalPage, error, page } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery images={images} openModal={this.onOpenModal} />

        {/* модалка  */}
        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={imgUrl} alt={tag} />
          </Modal>
        )}

        {/* спінер */}
        <Loader isLoading={loading} />

        {/* кнопка завантажити ще */}
        {totalPage / 12 > page && <Button loadMore={this.onLoadMore} />}

        {/* нічого не знайшло */}
        {totalPage === 0 && <ImageErrorView />}

        {/* помилка запиту */}
        {error && <ImageErrorView>{error}</ImageErrorView>}
      </>
    );
  }
}
