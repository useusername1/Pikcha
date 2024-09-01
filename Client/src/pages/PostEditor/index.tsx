import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  PostContent,
  PostPreviewList,
  PostTags,
} from "../../recoil/writePostState";
import Button from "../../components/@common/Button";
import {
  ImageUploader,
  TagCreator,
  WritingGuide,
} from "../../components/PostEditor";
import { handlePostSubmit } from "../../api/Write_EditPost/handlePostSubmit";
import { BsDot } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import * as wp from "./styled";
import { getPost } from "../../api/BlogDetail/Get/Get";

interface PostEditorProps {
  mode: "edit" | "new";
}

function PostEditor({ mode }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useRecoilState(PostTags);
  const [postPreviewList, setPostPreviewList] = useRecoilState(PostPreviewList);
  const [content] = useRecoilState(PostContent);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isWriteGuideModal, setIsWriteGuideModal] = useState(true);
  const { postId } = useParams();
  const navigate = useNavigate();
  console.log(postPreviewList, "이거 확인!!!!!");

  useEffect(() => {
    if (mode === "edit") {
      const getData = async () => {
        const result = await getPost(postId);
        const previewContents = result.postImageUrls.concat(
          result.postContents
        );
        console.log(result, previewContents, "result,previewContents");
        setTitle(result.postTitle);
        setTags(result.postHashTags);
        setPostPreviewList((preview) => [...preview, previewContents]);
      };
      getData();
    }
  }, []);
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title.length > 30) alert("30자 이내로 작성해주세요.");
  };

  const handleRemovePreview = (
    e: React.MouseEvent<HTMLOrSVGElement>,
    idx: number
  ) => {
    e.preventDefault();
    if (imgFiles) {
      setPostPreviewList(
        postPreviewList.filter((previews) => postPreviewList[idx] !== previews)
      );
      setImgFiles(imgFiles.filter((file) => imgFiles[idx] !== file));
    }
  };

  const handleImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowImageUploader(!showImageUploader);
  };

  const actionPostSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const post = await handlePostSubmit(title, tags, imgFiles, content, postId);
    navigate(`/posts/detail/${post}`);
  };

  return (
    <>
      {isWriteGuideModal ? (
        <WritingGuide setIsWriteGuideModal={setIsWriteGuideModal} />
      ) : null}
      <wp.Header>
        <div>
          <span>
            <BsDot color="#6255F8" />
            {mode === "edit" ? "수정 포스트" : "새 포스트"}
          </span>
          <Button
            type="violet"
            width="80px"
            height="20px"
            text="가이드 보기"
            onClick={() => setIsWriteGuideModal(true)}
          />
        </div>
        <div>미리보기</div>
      </wp.Header>
      <wp.Container>
        <wp.WritePostWrapper>
          <wp.WritePostContainer>
            <div>
              <input
                value={title}
                onChange={(e) => {
                  handleTitle(e);
                }}
                placeholder="제목을 입력하세요"
              ></input>
              <Button
                type="custom"
                width="100px"
                height="40px"
                text="이미지 등록"
                backgroundColor="var(--purple-200)"
                onClick={(e) => handleImageModal(e)}
                hoverBackgroundColor="var(--purple-300)"
                hovercolor="white"
              />
            </div>
            <TagCreator />
            {showImageUploader ? (
              <ImageUploader setImgFiles={setImgFiles} />
            ) : null}
          </wp.WritePostContainer>
          <wp.HandleBackAndSubmitContainer>
            <div onClick={() => navigate(-1)}>
              <MdOutlineKeyboardBackspace />
            </div>
            <Button
              type="violet"
              width="100px"
              height="40px"
              text="포스트 등록"
              onClick={(e) => actionPostSubmit(e)}
            />
          </wp.HandleBackAndSubmitContainer>
        </wp.WritePostWrapper>
        <wp.PreviewContainer>
          <div>
            <h2>{title}</h2>
          </div>
          {postPreviewList &&
            postPreviewList.map((previews, index) => {
              console.log(previews, index, "이것도 확인하자");
              return (
                <wp.PreviewContentContainer key={index}>
                  <wp.PreviewImgContainer>
                    <img src={previews[0]} />
                  </wp.PreviewImgContainer>
                  <wp.PreviewTextContainer>
                    {previews[1]}
                    <CgClose
                      cursor="pointer"
                      onClick={(e) => handleRemovePreview(e, index)}
                    />
                  </wp.PreviewTextContainer>
                </wp.PreviewContentContainer>
              );
            })}
        </wp.PreviewContainer>
      </wp.Container>
    </>
  );
}
export default PostEditor;
