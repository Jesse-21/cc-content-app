import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IPrimaryProfileCard } from "../../types";
import { parseURL } from "../../helpers/functions";
import { AuthContext } from "../../context/auth";
import Avatar from "@/components/Avatar";

const PrimaryProfileCard = ({
  handle,
  avatar,
  metadata,
}: IPrimaryProfileCard) => {
  const { address } = useContext(AuthContext);
  const [src, setSrc] = useState(parseURL(avatar));
  const [data, setData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    if (!metadata) return;
    (async () => {
      setData({
        name: "",
        bio: "",
      });
      try {
        const res = await fetch(parseURL(metadata));
        if (res.status === 200) {
          const data = await res.json();
          setData(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [metadata]);

  return (
    <div className="profile-card">
      <div className="profile-card-img center">
        <Link href="/settings">
          <div>
            <Avatar value={handle} size={80} />
          </div>
        </Link>
        {address && (
          <div className="profile-card-address">
            <div>{`${address.slice(0, 6)}..`}</div>
            <div></div>
          </div>
        )}
      </div>
      <div>
        <div className="account-card-name">{data.name}</div>
        <div className="account-card-handle">@{handle}</div>
      </div>
    </div>
  );
};

export default PrimaryProfileCard;
