import { FormEvent, useState } from "react";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    "bernardo@teste.com.br",
    "john@acme.com",
  ]);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsGuestsModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!destination) {
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src={Logo} alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openGuestsModal={openGuestsModal}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}
    </div>
  );
}
