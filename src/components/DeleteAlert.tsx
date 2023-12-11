import { t } from "i18next";
import Button from "./Button/Button";

type Props = {
  onClose: () => void;
  onDelete: () => void;
};

function DeleteAlert({ onClose, onDelete }: Props) {
  return (
    <div className="deleteModalOverlay" id="deleteModalOverlay">
      <div className="deleteModalInner">
        <div>
          <h3 className="pb-5 deletePopUp">{t("DeleteText")}</h3>
          <div className="d-flex modalButton">
            {/* <div className="mx-2"> */}
            <Button text={t("Cancel")} color={""} onButtonClick={onClose} />
            {/* </div> */}
            <Button text={t("Delete")} color={""} onButtonClick={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAlert;
