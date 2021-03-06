// import 'jquery';
import toastr from 'toastr';
import { galleryModel } from 'view';
import { templates } from "templates";
import { userController } from 'userController';


let galleryController = (function () {
    class GalleryController {
        constructor(templates, galleryModel) {
            this.templates = templates;
            this.galleryModel = galleryModel;
        }

        getGallery(selector) {
            $(selector).empty();
            let result;
            this.galleryModel.getAllPaintings().then(function (data) {
                result = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function (template) {
                $('aside').removeClass('hidden');
                selector.html(template(result));
            }).catch(function (error) {
                toastr.error('Unable to display gallery!');
                location.hash = '#/home';
            });
        }

        getPaintingById(selector, id) {
            $(selector).empty();
            let result;
            let resultComments;
            let self = this;
            this.galleryModel.getPaintingsInfo(id)
                .then(function (data) {
                    result = data;
                    return templates.getTemplate('paintings-info');
                }).then(function (template) {
                    selector.html(template(result));

                    $('.like').on('click', function () {
                        self.galleryModel.rateLikes(result)
                            .then(function (data) {
                                return self.galleryModel.getLikes(data.paintingId);
                            }).then(function (array) {
                                $('.likes').text(array.length);
                                $('.rate-like').removeClass('hidden');
                                $('.like').attr('disabled', true);
                            });
                    });

                    $('.dislike').on('click', function () {
                        self.galleryModel.rateDislikes(result)
                            .then(function (data) {
                                return self.galleryModel.getDislikes(data.paintingId);
                            }).then(function (array) {
                                $('.dislikes').text(array.length);
                                $('.rate-dislike').removeClass('hidden');
                                $('.dislike').attr('disabled', true);
                            });
                    });

                    $('.download').on('click', function () {
                        self.galleryModel.downloadPainting(result.image._id)
                            .then(downloadWithSuccess)
                            .catch(function (error) {
                                toastr.error('Unable to download painting!');
                            });
                    });

                    $('#comments-container').addClass('hidden');
                    $('.comment').on('click', function () {
                        $('#comments-container').toggleClass('hidden');
                        self.galleryModel.getAllComments(result._id).then(function (data) {
                            resultComments = {
                                comments: data
                            };
                            return templates.getTemplate('comments');
                        }).then(function (template) {
                            $('#comments-container').html(template(resultComments));

                            $('#add-comment').on('click', function (ev) {
                                let content = {
                                    date: moment().format("ll"),
                                    text: $('#textarea-comment').val(),
                                    user: sessionStorage.getItem("username"),
                                    paintingId: result._id
                                };
                                if (content.text === "") {
                                    toastr.error("You have not write a comment!");
                                    ev.preventDefault();
                                    return;
                                }
                                self.galleryModel.addNewComment(content).then(function (data) {
                                    toastr.success('Comment was added');
                                }).catch(function (error) {
                                    toastr.error('Try again');
                                });

                                self.galleryModel.getAllComments(result._id).then(function (data) {
                                    resultComments = {
                                        comments: data
                                    };
                                    return templates.getTemplate('comments');
                                }).then(function (template) {
                                    $('#comments-container').html(template(resultComments));
                                });
                            });
                        });
                    });
                })
                .then(() => {
                    $('.buy').on('click', () => this.addToCart(result));
                    if (userController.shoppingCartManager.isAdded(id)) {
                        $('.buy').attr('disabled', true);
                    } else {
                        $('.buy').attr('disabled', false);
                    }
                })
                .catch(function (error) {
                    toastr.error('Unable to display painting!');
                    location.hash = '#/paintings';
                });
        }

        getPaintingByArtist(selector, artist) {
            $(selector).empty();
            let result;
            this.galleryModel.getArtistsInfo(artist).then(function (data) {
                result = {
                    paintings: data
                };
                return templates.getTemplate('artist-info');
            }).then(function (template) {
                selector.html(template(result));
            }).catch(function (error) {
                toastr.error('Unable to display painting!');
                location.hash = '#/paintings';
            });
        }

        addToCart(paintingData) {
            let newItmensCount = userController.shoppingCartManager.shoppingItemsCountElement.text(),
                cartCountElement = userController.shoppingCartManager.shoppingItemsCountElement;
            newItmensCount++;
            cartCountElement.text(newItmensCount);
            userController.shoppingCartManager.items.push({
                id: paintingData._id,
                image: paintingData.image,
                title: paintingData.title,
                author: paintingData.artist.name,
                price: paintingData.price
            });
            $('.buy').attr('disabled', true);
        }

        getPaintingsByStyle(selector, style) {
            $(selector).empty();
            let resultStyle;
            this.galleryModel.getPaintingsInfoByStyle(style).then(function (data) {
                resultStyle = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function (template) {
                selector.html(template(resultStyle));
            }).catch(function (error) {
                toastr.error('Unable to display paintings!');
                location.hash = '#/paintings';
            });
        }

        getPaintingsBySubject(selector, subject) {
            $(selector).empty();
            let resultSubject;
            this.galleryModel.getPaintingsInfoBySubject(subject).then(function (data) {
                resultSubject = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function (template) {
                selector.html(template(resultSubject));
            }).catch(function (error) {
                toastr.error('Unable to display paintings!');
                location.hash = '#/paintings';
            });
        }

        getPaintingsByTechnique(selector, technique) {
            $(selector).empty();
            let resultTechnique;
            this.galleryModel.getPaintingsInfoByTechnique(technique).then(function (data) {
                resultTechnique = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function (template) {
                selector.html(template(resultTechnique));
            }).catch(function (error) {
                toastr.error('Unable to display paintings!');
                location.hash = '#/paintings';
            });
        }

        searchByTitle(selector, title) {
            $(selector).empty();
            let result;
            this.galleryModel.getPaintingsByTitle(title).then(function (data) {
                result = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function (template) {
                selector.html(template(result));

            }).catch(function (error) {
                toastr.error('Unable to display painting!');
                location.hash = '#/paintings';
            });
        }

        searchByArtist(selector, artist) {
            $(selector).empty();
            let result;
            this.galleryModel.getPaintingsByArtist(artist).then(function (data) {
                result = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function (template) {
                selector.html(template(result));

            }).catch(function (error) {
                toastr.error('Unable to display painting!');
                location.hash = '#/paintings';
            });
        }
    }

    function downloadWithSuccess(data) {
        let url = data._downloadURL;
        let link = document.createElement('a');
        link.download = url.substr(url.lastIndexOf('/'));
        link.href = url;
        link.click();
    }

    return new GalleryController(templates, galleryModel);
})();

export { galleryController };