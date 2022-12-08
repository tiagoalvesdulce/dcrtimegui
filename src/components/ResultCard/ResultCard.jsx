import React from "react";
import PropTypes from "prop-types";
import Digest from "./Digest";
import ChainInfo from "./ChainInfo";
import DownloadProof from "./DownloadProof";
import styles from "./ResultCard.module.css";
import {ReactComponent as TimestampedDark} from "../../assets/icons/timestamped-dark.svg";
import {ReactComponent as TimestampedLight} from "../../assets/icons/timestamped-light.svg";
import {ReactComponent as Pending} from "../../assets/icons/pending.svg";
import {ReactComponent as GoBack} from "../../assets/icons/goback-button-arrow.svg";
import useTheme from "src/theme/useTheme";
import Button from "src/components/Button";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResultCard = ({
    name,
    digest,
    chainInfo,
    status,
    history
}) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    let StatusComponent = null;
    let statusText = "";
    switch (status) {
    case "Timestamped":
        if (isDarkTheme) StatusComponent = TimestampedDark;
        else StatusComponent = TimestampedLight;
        statusText = "Timestamped";
        break;
    case "Pending":
        StatusComponent = Pending;
        statusText = "Pending";
        break;
    default:
        StatusComponent = Pending;
        statusText = "Not found";
    };
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.heading}>Hash status</h3>
                <div className={styles.statusDigestWrapper}>
                    <Digest digest={digest} />
                    <div className={styles.statusWrapper}>
                        <span className={styles.statusText}>{statusText}</span>
                        <StatusComponent />
                    </div>
                </div>
                {status === "Timestamped" || status === "Pending" ? (
                    <>
                        <h3 className={styles.heading}>{t("hashView.details")}</h3>
                        <ChainInfo chainInfo={chainInfo} />
                    </>
                ) : null}
                <div className={styles.actionButtons}>
                    <Button kind="secondary" text={t("hashView.goBack")} Icon={GoBack} handleClick={() => history.goBack()}/>
                    <DownloadProof
                        data={{
                            digest: digest,
                            ...chainInfo
                        }}
                        name={name}
                    />
                </div>
            </div>
        </div>
    );
};

ResultCard.propTypes = {
    name: PropTypes.string,
    digest: PropTypes.string,
    chainInfo: PropTypes.object,
    statusTag: PropTypes.node,
    isDigestAnchored: PropTypes.bool
};

export default withRouter(ResultCard);
