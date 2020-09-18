import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import classes from "../../../assets/scss/modules/accordionComponent.module.scss";
import Spinner from '../Spinner';

import accordionInnerClasses from '../../../assets/scss/modules/accordionInner.module.scss';

const AccordionComponent = ({ comp, content, getElem }) => {

    const [users, setUsers] = useState();
    const [stories, setStories] = useState();
    const [posts, setPosts] = useState();
    const [initialState, setInitialState] = useState(false);

    const [numStories, setNumStories] = useState();

    useEffect(() => {
        if (comp === 'Users') {
            setUsers(content);
        }
        if (comp === 'Stories') {
            setStories(content);
        }
        if (comp === 'Posts') {
            setPosts(content);
        }

        setInitialState(true);
    });

    const test = (cont) => {

        let newCont = [];
        let newArr = [];

        for (let i = 0; i < cont.length; i++){
            if (newCont.includes(cont[i]._id)) {
                newArr.push(cont[i])
            } else {
                newCont.push(cont[i]);
            }
        }

        console.log(newArr);
        console.log(cont.length);
        console.log(newCont);

        return (
            cont.map(item => (
                <div key={`${item._id} ${item.updatedAt}`} className={accordionInnerClasses.StoriesRow} id={item._id} onClick={(e) => getElem(e, item.title)}>
                    <div className={accordionInnerClasses.Inner}>
                        <p>{item.title} {item.__v}</p>
                        <p>{item.isPublished === true ? 'Published' : 'Draft'}</p>
                    </div>
                </div>
            ))
        )
    }

    const accordionHeight = (arg) => {
        // Gets the inner portion of the accordion in order to set max-height;
        const accordionInner = arg.childNodes[0];
        const heightConstraint = 350;

        if (accordionInner.scrollHeight > heightConstraint) {
            accordionInner.style.maxHeight = heightConstraint + "px";
        } else {
            accordionInner.style.overflowY = 'auto';
        }

        if (arg.style.maxHeight) {
            arg.style.maxHeight = null;
        } else {
            arg.style.maxHeight = arg.scrollHeight + "px";
        }

        return

    };

    const accordion = (e) => {
        const elem = e.target;
        let pnl = elem.nextElementSibling;

        if (elem.classList.contains(classes.accordion__active)) {
            elem.classList.remove(classes.accordion__active);

            accordionHeight(pnl);
        } else {

            elem.classList.toggle(classes.accordion__active);

            accordionHeight(pnl);
        }

    }

    return initialState === false ? (
        <Spinner />
    ) : (
            <section className={classes.accordion__component}>
                {
                    comp === 'Users' ? (
                        <>
                            <button className={`${classes.accordion} ${comp}`} onClick={accordion}>
                                {comp}
                                <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                            </button>
                            <article className={classes.panel} id={comp}>
                                <div className={accordionInnerClasses.Users}>
                                    <div className={accordionInnerClasses.UsersTitleRow}>
                                        <div className={accordionInnerClasses.TitleRowInner}>
                                            <p><strong>Name</strong></p>
                                            <p><strong>UserName</strong></p>
                                            <p><strong>Role</strong></p>
                                        </div>
                                    </div>
                                    {
                                        content.map(item => (
                                            <div key={`${item._id} ${item.updatedAt}`} className={accordionInnerClasses.UsersRow} id={item._id} onClick={getElem}>
                                                <div className={accordionInnerClasses.Inner}>
                                                    <p>{item.name}</p>
                                                    <p>{item.userName}</p>
                                                    <p>{item.role}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </article>
                        </>
                    ) : (
                            comp === 'Stories' ? (
                                <>
                                    <button className={`${classes.accordion} ${comp}`} onClick={accordion}>
                                        {comp}
                                        <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                                    </button>
                                    <article className={classes.panel} id={comp}>
                                        <div className={accordionInnerClasses.Stories}>
                                            <div className={accordionInnerClasses.StoriesTitleRow}>
                                                <div className={accordionInnerClasses.TitleRowInner}>
                                                    <p><strong>Story</strong></p>
                                                    <p><strong>Status</strong></p>
                                                </div>
                                            </div>
                                            {test(content)}
                                            {/* {
                                                content.map(item => (
                                                    <div key={`${item._id} ${item.updatedAt}`} className={accordionInnerClasses.StoriesRow} id={item._id} onClick={(e) => getElem(e, item.title)}>{console.log(content.length)}
                                                        <div className={accordionInnerClasses.Inner}>
                                                            <p>{item.title} {item.__v}</p>
                                                            <p>{item.isPublished === true ? 'Published' : 'Draft'}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            } */}
                                        </div>
                                    </article>
                                </>
                            ) : (
                                    comp === 'Posts' ? (
                                        <>
                                            <button className={`${classes.accordion} ${comp}`} onClick={accordion}>
                                                {comp}
                                                <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                                            </button>
                                            <article className={classes.panel} id={comp}>
                                                <div className={accordionInnerClasses.Posts}>
                                                    <div className={accordionInnerClasses.PostsTitleRow}>
                                                        <div className={accordionInnerClasses.TitleRowInner}>
                                                            <p><strong>Story</strong></p>
                                                            <p><strong>Title</strong></p>
                                                            <p><strong>Status</strong></p>
                                                            <p><strong>Comments</strong></p>
                                                        </div>
                                                    </div>
                                                    {
                                                        content.map(item => (
                                                            <div key={`${item._id} ${item.updatedAt}`} className={accordionInnerClasses.PostsRow} id={item._id} data-parent={item.storyId} onClick={getElem}>
                                                                <div className={accordionInnerClasses.Inner}>
                                                                    <p>{item.storyTitle}</p>
                                                                    <p>{item.title}</p>
                                                                    <p>{item.isPublished === true ? 'Published' : 'Draft'}</p>
                                                                    <p className="comment">{item.comments.length}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </article>
                                        </>
                                    ) : ''
                                )
                        )
                }
            </section>
        );
}

AccordionComponent.propTypes = {
    comp: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    getElem: PropTypes.func.isRequired
}
export default AccordionComponent;
